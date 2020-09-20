import { Clickable } from 'components/clickable';
import { Toggle } from 'components/toggle';
import anime from 'animejs';

function LampController() {
	return function(gameObject) {
		const self = gameObject;
		const toggle = Toggle(turnOn, turnOff)(self);

		let light = null;
		let lampshade = null;

		function start() {
			self.traverse((O) => {
				if (O.isLight) {
					light = O;
					light.decay = 1;
				}

				if (O.material && O.material.name === 'Lampshade') {
					lampshade = O;
					lampshade.material.transparent = true;
				}
			});

			self.components.push(toggle);
			toggle.turnOff();
		}

		function turnOn() {
			anime({
				targets: lampshade.material,
				opacity: 0.9,
				duration: 125,
				easing: 'linear'
			});

			anime({
				targets: light,
				intensity: 1,
				duration: 125,
				easing: 'linear',
			});
		}

		function turnOff() {
			anime({
				targets: lampshade.material,
				opacity: 1,
				duration: 125,
				easing: 'linear',
			});

			anime({
				targets: light,
				intensity: 0,
				duration: 125,
				easing: 'linear',
			});
		}

		return { name: 'LampController', start };
	}
}

function onClick(e, lamp) {
	lamp.components.find(c => c.name === 'Toggle').toggle();
}

function Lamp() {
	return {
		components: [
			Clickable(onClick),
			LampController(),
		],
	};
}

export default Lamp;
