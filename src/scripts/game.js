import { renderer } from 'renderer';
import { sceneIndex } from 'scenes/index';
import * as SceneManager from 'scene-manager';
import { getMainCamera } from 'camera-manager';
import { Clock } from 'three';
import { applyGameState as updateInventory } from 'inventory';

var mainCamera, activeScene, clock;

const SAVED_GAME_ID = 'mage-saved-game';

const defaultGameState = {
	inventory: [],
	scene: '',
	scenes: {
		demo: {
			'gotSphere': false,
			'poppedCone': false
		}
	}
};

const newGameState = {
	inventory: [],
	scene: 'demo',
	scenes: {
		demo: {
			'gotSphere': false,
			'poppedCone': false
		}
	}
};

let gameState = Object.assign({}, defaultGameState);
export function setGameState(state) {
	let currentState = getGameState();
	let newState = Object.assign({}, currentState, state);

	if (newState.scene != currentState.scene) {
		goToScene(newState.scene);
	}

	gameState = newState;

	if (activeScene && activeScene.applyGameState) {
		activeScene.applyGameState(gameState);
	}

	updateInventory(gameState);

	saveGame();
}

export function getGameState() {
	return Object.assign({}, gameState);
}

export function newGame() {
	setGameState(newGameState);
}

export function continueGame() {
	let savedState = Object.assign({}, newGameState);
	let savedData = localStorage.getItem(SAVED_GAME_ID);

	if (savedData) {
		savedState = JSON.parse(savedData);
	}

	setGameState(savedState);
}

function saveGame() {
	let json = JSON.stringify(gameState);
	localStorage.setItem(SAVED_GAME_ID, json);
}

export function goToScene(sceneName) {
	let scene = sceneIndex[sceneName];
	SceneManager.loadScene(scene).then(onLoadScene);
}

function onLoadScene() {
	clock = new Clock(true);
	activeScene = SceneManager.activeScene;
	mainCamera = getMainCamera();

	if (activeScene.applyGameState) {
		activeScene.applyGameState(getGameState());
	}

	animate();
}

function doGameFrame() {
	let d = clock.getDelta();

	activeScene.traverse(n => {
		if (n.components && Array.isArray(n.components)) {
			for (var i in n.components) {
				let component = n.components[i];
				if (component.update) {
					component.update(d);
				}
			}
		}
	});
}

function animate() {
	requestAnimationFrame(animate);

	doGameFrame();

	if (activeScene && mainCamera) {
		renderer.render(activeScene, mainCamera);
	}
}