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
}

export function getMainCamera() {
	return mainCamera;
}