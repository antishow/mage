import { newGame, continueGame } from './game';
import { appendRenderDomElement } from './renderer';

function onDocumentReady() {
	appendRenderDomElement(document.body);
	document.getElementById('new-game').addEventListener('click', newGame);
	document.getElementById('continue').addEventListener('click', continueGame);
}

document.addEventListener('DOMContentLoaded', onDocumentReady);