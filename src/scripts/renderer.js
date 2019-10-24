import { WebGLRenderer, PCFSoftShadowMap } from 'three';

export var renderer = new WebGLRenderer({
	antialias: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(320, 240);
renderer.gammaOutput = true;
renderer.gammaFactor = 2.2;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;
