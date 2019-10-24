import { Vector3, Raycaster } from 'three';
import { getWASD, getTurn } from 'input';
import { activeScene as scene } from 'scene-manager';
import { projectPointOntoGeometry } from 'components/nav-mesh';

export function Walk(speed = 0.08) {
	return function(object) {
		var self = object;
		var navMesh;

		function start() {
			navMesh = scene.getObjectByName('_NavMesh');
		}

		function update() {
			let walkInput = getWASD();
			let turnInput = getTurn();

			if (turnInput) {
				self.rotation.y += turnInput * speed * -0.333;
			}

			let d = new Vector3(0, 0, 0);
			let isMoving = false;

			if (walkInput.y) {
				isMoving = true;
				let dy = new Vector3(0, 0, -walkInput.y);
				d.add(dy);
			}
			if (walkInput.x) {
				isMoving = true;
				let dx = new Vector3(walkInput.x, 0, 0);
				d.add(dx);
			}

			if (isMoving) {
				d.transformDirection(self.matrixWorld).clampLength(0, speed);

				let test = self.position.clone().add(d);
				let floorCheck = new Raycaster(test, new Vector3(0, -1, 0));
				let floorIntersects = floorCheck.intersectObject(navMesh);

				if (floorIntersects.length === 0) {
					let fixed = projectPointOntoGeometry(test, navMesh.geometry);
					test.copy(fixed);
				}

				self.position.set(test.x, test.y, test.z);
			}
		}

		return { name: 'Walk', start, update }
	}
}