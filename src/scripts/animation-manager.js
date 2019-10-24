import { AnimationClip } from 'three';

export var animations = [];

export function setAnimations(c) {
	animations = c;
}

export function getAnimation(name) {
	return AnimationClip.findByName(animations, name);
}