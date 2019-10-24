document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

let activeKeys = [];

function onKeyDown(e) {
	if (!activeKeys.includes(e.code)) {
		activeKeys.push(e.code);
	}
}

function onKeyUp(e) {
	activeKeys.splice(activeKeys.indexOf(e.code), 1);
}

export function isDown(code) {
	return activeKeys.includes(code);
}