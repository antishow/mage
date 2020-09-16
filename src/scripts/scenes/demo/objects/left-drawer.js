import { Clickable } from 'components/clickable';
import { Vector3 } from 'three';
import anime from 'animejs';

let isOpen = false;
let closedPos = null;
let openPos = null;
let openSlide = new Vector3(-0.7, 0, 0);

function onClick(e) {
	const self = e.target;

	if (!closedPos) {
		closedPos = new Vector3().copy(self.position);
		openPos = new Vector3().copy(closedPos).add(openSlide);
	}

	isOpen  = !isOpen;

	let targetPosition = closedPos;
	if (isOpen) {
		targetPosition = openPos;
	}

	anime({
		targets: self.position,
		x: targetPosition.x,
		y: targetPosition.y,
		z: targetPosition.z,
		easing: 'linear',
	});
}

function LeftDrawer() {
	return {
		components: [
			Clickable(onClick),
		],
	};
}

export default LeftDrawer;
