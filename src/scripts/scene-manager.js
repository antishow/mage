import { Vector2, AmbientLight } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { setCameras, setMainCamera } from './camera-manager';
import { setAnimations } from './animation-manager';
import { renderer } from './renderer';

export var activeScene;

export function loadScene(sceneData) {
	return new Promise(function(resolve, reject) {
		let loader = new GLTFLoader();

		loader.load(
			sceneData.file,
			function(gltf) {
				setAnimations(gltf.animations);
				prepareCameras(gltf.cameras);
				prepareScene(gltf.scene, sceneData);
				activeScene = gltf.scene;

				startScene(activeScene);
				resolve(gltf);
			},
			onLoadSceneProgress,
			reject
		);
	});
}

function prepareCameras(newCameras) {
	let size = new Vector2();
	renderer.getSize(size);

	let aspect = size.x / size.y;

	for (var i in newCameras) {
		let cam = newCameras[i];
		cam.aspect = aspect;
		cam.updateProjectionMatrix();
	}

	setMainCamera(newCameras[0]);
	setCameras(newCameras);
}

function prepareScene(scene, data) {
	let outline = Object.keys(data.outline);

	scene.clickables = [];
	scene.traverse(n => {
		if (n.name.substring(0, 1) === '_') {
			n.material.visible = false;
		}

		if (n.isLight) {
			n.castShadow = true;
			n.shadow.bias = 0.001;
		}

		if (n.userData) {
			Object.assign(n, n.userData);
		}

		if (outline.includes(n.name)) {
			let obj = data.outline[n.name];

			if (obj.options) {
				Object.assign(n, obj.options);
			}

			if (obj.components) {
				n.components = obj.components.map(component => component(n));
				if (n.components.find(C => C.name == 'Clickable')) {
					scene.clickables.push(n);
				}
			}
		}
	});

	var ambient = new AmbientLight(data.ambientColor, data.ambientIntensity);
	scene.add(ambient);

	if (data.applyGameState) {
		scene.applyGameState = data.applyGameState;
	}
}

function startScene(scene) {
	scene.traverse(n => {
		if (n.components && Array.isArray(n.components)) {
			for (var i in n.components) {
				let component = n.components[i];
				if (component.start) {
					component.start();
				}
			}
		}
	});
}

function onLoadSceneProgress(xhr) {
	console.log((xhr.loaded / xhr.total * 100) + '% loaded');
}

export function findObject(name) {
	return activeScene.getObjectByName(name);
}
