import { Clickable } from 'components/clickable';
import { Animator } from 'components/animator';

function onClick(e) {
	const animator = e.target.components.find(c => c.name == 'Animator');
	if (animator) {
		animator.playClip('Flip');
	}
}

function Doodad() {
	return {
		components: [
			Clickable(onClick),
			Animator('Flip')
		]
	}
}

export default Doodad;
