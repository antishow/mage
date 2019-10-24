import { newGame, continueGame } from './game';
import { renderer } from './renderer';

function onDocumentReady() {
	document.body.appendChild(renderer.domElement);
	document.getElementById('new-game').addEventListener('click', newGame);
	document.getElementById('continue').addEventListener('click', continueGame);
}

document.addEventListener('DOMContentLoaded', onDocumentReady);