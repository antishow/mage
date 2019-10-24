import { getMainCamera } from 'camera-manager';
import { getFocus } from 'input';
import { moveTowards } from 'helpers';

export function Focus(focusRatio = 0.6, focusSpeed = 0.8) {
	return function(object) {
		var self = object;
		var camera;
		var defaultFov;
		var focusFov;

		function start() {
			camera = getMainCamera();
			defaultFov = camera.fov;
			focusFov = defaultFov * focusRatio;
		}

		function update() {
			self.isFocusing = getFocus();

			if (self.isFocusing) {
				if (camera.fov != focusFov) {
					let f = moveTowards(camera.fov, focusFov, focusSpeed);
					camera.fov = f;
					camera.updateProjectionMatrix();
				}
			} else {
				if (camera.fov != defaultFov) {
					let f = moveTowards(camera.fov, defaultFov, focusSpeed);
					camera.fov = f;
					camera.updateProjectionMatrix();
				}
			}
		}

		return { name: 'Focus', start, update }
	}
}