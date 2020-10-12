import { Vector2 } from 'three';
import { rendererMatchElementSize, renderer } from 'renderer';

var cameras = [];
var mainCamera = null;

export function setCameras(c) {
	cameras = c;
}

export function getCameras() {
	return cameras;
}

export function setMainCamera(cam) {
	mainCamera = cam;
	updateCameraSize(cam);
}

export function getMainCamera() {
	return mainCamera;
}

function updateCameraSize(camera) {
	rendererMatchElementSize();
	const size = new Vector2();
	renderer.getSize(size);
	const aspect = size.x / size.y;

	camera.aspect = aspect;
	camera.fov = 48;

	camera.updateProjectionMatrix();
}

window.addEventListener('resize', function() {
	updateCameraSize(mainCamera);
});
