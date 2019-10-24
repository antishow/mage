import { getGameState, setGameState } from 'game';

export function getSphere() {
	console.log('COLLECTED THE SPHERE');

	let state = getGameState();

	state.inventory = [...state.inventory, 'sphere'];
	state.scenes.demo.gotSphere = true;

	setGameState(state);
}

export function popCone() {
	console.log('POPPED THE CONE');

	let state = getGameState();
	state.scenes.demo.poppedCone = true;

	setGameState(state);
}
