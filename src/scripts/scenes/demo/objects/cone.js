import { Clickable } from 'components/clickable';
import { popCone } from '../actions';
import { getActiveItem } from 'inventory';
import { popMessage } from 'helpers';

function onClick(e) {
	if (getActiveItem() === 'sphere') {
		popMessage(
			'NOOOOOOOoooooo....',
			e.click.clientX,
			e.click.clientY,
			2000
		);
		popCone();
	} else {
		popMessage(
			'You can’t pop me, fool! You’re not even blue!',
			e.click.clientX,
			e.click.clientY,
			2000
		);
	}
}

function Cone() {
	return {
		components: [
			Clickable(onClick),
		]
	}
}

export default Cone;
