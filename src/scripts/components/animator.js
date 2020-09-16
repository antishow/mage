import { getAnimation } from 'animation-manager';
import { AnimationMixer, LoopOnce } from 'three';

export function Animator(...animations) {
	return function(object) {
		const self = object;
		var mixer;
		var actions;
		var currentAction = false;

		function start() {
			mixer = new AnimationMixer(self);
			actions = animations.reduce((actions, name) => {
				let animation = getAnimation(name);
				let action = mixer.clipAction(animation);
				action.loop = LoopOnce;
				action.clampWhenFinished = true;

				actions[name] = action;
				return actions;
			}, {});

			mixer.addEventListener('finished', onFinished);
		}

		function update(deltaTime) {
			if (currentAction && currentAction.enabled) {
				mixer.update(deltaTime);
			}
		}

		function onFinished(e) {
			currentAction.paused = true;
			currentAction = false;
		}

		function playClip(clipName) {
			const action = actions[clipName];

			action.reset();
			action.play();
			currentAction = action;
		}

		return { name: 'Animator', start, update, playClip }
	}
}