import { Raycaster, Vector2 } from 'three';
import { renderer } from 'renderer';
import { activeScene as scene } from 'scene-manager';
import { getMainCamera } from 'camera-manager';

export const PLAYER_CLICK = 'playerclick';

export function Click() {
	return function(object) {
		var self = object;
		var raycaster;
		var canvas;
		var camera;
		var isDown = false;
		var cancelClick = false;

		function start() {
			canvas = renderer.domElement;
			raycaster = new Raycaster();
			camera = getMainCamera();

			canvas.addEventListener('mousedown', onMouseDown);
			canvas.addEventListener('mouseup', onMouseUp);
			canvas.addEventListener('mousemove', onMouseMove);
			canvas.addEventListener('dblclick', onDoubleClick);
		}

		function onMouseMove(e) {
			if (isDown) {
				cancelClick = true;
			}
		}

		function onMouseDown(e) {
			isDown = true;
			cancelClick = false;
		}

		function onMouseUp(e) {
			isDown = false;

			if (!cancelClick) {
				onClick(e);
			}
		}

		function onDoubleClick(e) {
			console.log('Double Clicked!');
		}

		function onClick(e) {
			let mx = e.clientX - e.target.offsetLeft;
			let my = e.clientY - e.target.offsetTop;

			let x = (mx / e.target.offsetWidth) * 2 - 1;
			let y = - (my / e.target.offsetHeight) * 2 + 1;

			raycaster.setFromCamera(new Vector2(x, y), camera);
			var intersects = raycaster.intersectObjects(scene.clickables);

			if (intersects.length > 0) {
				let clicked = intersects.shift();
				clicked.object.dispatchEvent({ type: PLAYER_CLICK, click: e });
			}
		}

		return { name: 'Click', start }
	}
}
