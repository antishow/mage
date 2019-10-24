import { NavMesh } from 'components/nav-mesh';
import { findObject } from 'scene-manager';

import Doodad from './objects/doodad';
import Player from './objects/player';
import Sphere from './objects/sphere';
import Cone from './objects/cone';

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
		'Floor': {
			options: {
				receiveShadow: true,
				castShadow: false
			}
		},
		'North_Wall': {
			options: {
				receiveShadow: true,
				castShadow: false
			}
		},
		'East_Wall': {
			options: {
				receiveShadow: true,
				castShadow: false
			}
		},
		'West_Wall': {
			options: {
				receiveShadow: true,
				castShadow: true
			}
		},
		'South_Wall': {
			options: {
				receiveShadow: true,
				castShadow: true
			}
		},
		'Sun_Orientation': {
			options: {
				intensity: 3,
				castShadow: true
			}
		},
		'Spot_Orientation': {
			options: {
				castShadow: true
			}
		},
		'Warm_Spot_Orientation': {
			options: {
				castShadow: true
			}
		}
	}
};
