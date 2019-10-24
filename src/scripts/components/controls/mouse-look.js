import { Math as Mathf, Vector2 } from 'three';
import { renderer } from '../../renderer';
import { getMainCamera } from '../../camera-manager';

export function MouseLook() {
	return function(object) {
		var self = object;
		var camera = null;
		var canvas = null;
		var sensitivity = -0.007;

		var isLooking = false;
		var mousePosition = null;

		function start() {
			camera = getMainCamera();
			canvas = renderer.domElement;

			canvas.addEventListener('mousedown', onMouseDown);
			canvas.addEventListener('mouseup', onMouseUp);
			canvas.addEventListener('mouseleave', onMouseLeave);
		}

		function onMouseDown(e) {
			startLooking(e);
		}

		function onMouseUp(e) {
			stopLooking();
		}

		function onMouseLook(e) {
			let lookPosition = new Vector2(e.clientX, e.clientY);
			let dx = lookPosition.x - mousePosition.x;
			let dy = lookPosition.y - mousePosition.y;

			dx *= sensitivity;
			dy *= sensitivity * 0.5;

			self.rotation.y += dx;
			let pitch = Mathf.clamp(camera.rotation.x + dy, -Math.PI * 0.8, -Math.PI * 0.2);
			camera.rotation.x = pitch;

			mousePosition = lookPosition;
		}

		function onMouseLeave(e) {
			stopLooking();
		}

		function startLooking(e) {
			if (!isLooking) {
				isLooking = true;
				mousePosition = new Vector2(e.clientX, e.clientY);
				canvas.addEventListener('mousemove', onMouseLook);
			}
		}

		function stopLooking() {
			if (isLooking) {
				isLooking = false;
				canvas.removeEventListener('mousemove', onMouseLook);
			}
		}

		return { name: 'MouseLook', start }
	};
}
