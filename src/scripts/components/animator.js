import { getAnimation } from 'animation-manager';
import { AnimationMixer, LoopOnce } from 'three';

export function Animator(...animations) {
	return function(object) {
		var self = object;
		var mixer;
		var actions;
		var currentAction = false;

		function start() {
			mixer = new AnimationMixer(self);
			actions = animations.reduce((actions, name) => {
				let animation = getAnimation(name);
				let action = mixer.clipAction(animation);
				action.setLoop(LoopOnce);
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
			currentAction.stop();
			currentAction = false;
		}

		function playClip(clipName) {
			let action = actions[clipName];
			action.play();
			currentAction = action;
		}

		return { name: 'Animator', start, update, playClip }
	}
}