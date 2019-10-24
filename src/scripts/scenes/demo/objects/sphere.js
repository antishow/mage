import { popMessage } from 'helpers';
import { Clickable } from 'components/clickable';
import { getSphere } from '../actions';

function onClick(e) {
	console.log('Clicked on the Sphere!');
	console.log(e);

	popMessage(
		'<strong>Hello!</strong> I am a <em>sphere!</em> Although I am but a humble mesh, I am capable of responding to clicks with this message. Like, words and everything. It\'s not a HUGE deal, but it is my job.',
		e.click.clientX,
		e.click.clientY,
		6000
	);

	getSphere();
}

function Sphere() {
	return {
		components: [
			Clickable(onClick),
		],
		options: {
			castShadow: true
		}
	}
}

export default Sphere;
