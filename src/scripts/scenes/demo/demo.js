import { NavMesh } from 'components/nav-mesh';
import { findObject } from 'scene-manager';

import Doodad from './objects/doodad';
import Player from './objects/player';
import Sphere from './objects/sphere';
import Cone from './objects/cone';
import LeftDrawer from './objects/left-drawer';

function applyGameState(state) {
	let sceneState = state.scenes.demo;
	let sphere = findObject('Sphere');
	let cone = findObject('Cone');

	sphere.visible = !sceneState.gotSphere;
	cone.visible = !sceneState.poppedCone;
}

export var Demo = {
	name: 'demo',
	file: 'assets/models/scene.glb',
	ambientColor: 0x204080,
	ambientIntensity: 0.6,
	applyGameState,
	outline: {
		'_NavMesh': {
			components: [ NavMesh() ]
		},
		'Player': Player(),
		'Cone': Cone(),
		'Sphere': Sphere(),
		'Doodad': Doodad(),
		'Drawer.L': LeftDrawer(),
	}
};
