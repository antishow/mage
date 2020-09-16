import { WebGLRenderer, PCFSoftShadowMap, sRGBEncoding } from 'three';

export var renderer = new WebGLRenderer({
	antialias: true,
});

renderer.outputEncoding = sRGBEncoding;
renderer.physicallyCorrectLights = true;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(320, 240);
renderer.gammaOutput = true;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;
