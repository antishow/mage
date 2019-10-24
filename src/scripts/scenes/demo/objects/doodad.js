import { Clickable } from 'components/clickable';
import { Animator } from 'components/animator';

function onClick(e) {
	let animator = e.target.components.filter(c => c.name == 'Animator').pop();
	if (animator) {
		animator.playClip('Flip');
	}
}

function Doodad() {
	return {
		components: [
			Clickable(onClick),
			Animator('Flip')
		],
		options: {
			castShadow: true
		}
	}
}

export default Doodad;
