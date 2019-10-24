import { Vector2 } from 'three';
import * as Key from './key';

const FORWARD = 'KeyW';
const BACKWARD = 'KeyS';
const LEFT = 'KeyA';
const RIGHT = 'KeyD';
const TURN_LEFT = 'KeyQ';
const TURN_RIGHT = 'KeyE';
const CROUCH = 'ShiftLeft';
const FOCUS = 'KeyZ';

export function getWASD() {
	let ret = new Vector2();

	if (Key.isDown(FORWARD)) {
		ret.y += 1;
	}

	if (Key.isDown(LEFT)) {
		ret.x -= 1;
	}

	if (Key.isDown(BACKWARD)) {
		ret.y -= 1;
	}

	if (Key.isDown(RIGHT)) {
		ret.x += 1;
	}

	ret.clampLength(0, 1);
	return ret;
}

export function getTurn() {
	let ret = 0;

	if (Key.isDown(TURN_LEFT)) {
		ret -= 1;
	}

	if (Key.isDown(TURN_RIGHT)) {
		ret += 1;
	}

	return ret;
}

export function getCrouch() {
	return Key.isDown(CROUCH);
}

export function getFocus() {
	return Key.isDown(FOCUS);
}