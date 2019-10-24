import { getCrouch } from 'input';
import { moveTowards } from 'helpers';
import { getMainCamera } from 'camera-manager';

export function Crouch(crouchRatio = 0.4, crouchSpeed = 0.08) {
	return function(object) {
		var self = object;
		var camera;
		var cameraMan;
		var standHeight;
		var crouchHeight;

		function start() {
			camera = getMainCamera();
			cameraMan = camera.parent;
			standHeight = cameraMan.position.y;
			crouchHeight = crouchRatio * standHeight;
		}

		function update() {
			self.isCrouching = getCrouch();

			if (self.isCrouching) {
				if (cameraMan.position.y != crouchHeight) {
					let y = moveTowards(cameraMan.position.y, crouchHeight, crouchSpeed);
					cameraMan.position.set(cameraMan.position.x, y, cameraMan.position.z);
				}
			} else {
				if (cameraMan.position.y != standHeight) {
					let y = moveTowards(cameraMan.position.y, standHeight, crouchSpeed);
					cameraMan.position.set(cameraMan.position.x, y, cameraMan.position.z);
				}
			}
		}

		return { name: 'Crouch', start, update }
	}
}