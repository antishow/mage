export function moveTowards(number, target, speed) {
	if (number != target) {
		if (number > target) {
			number -= speed;
			if (number < target) {
				number = target;
			}
		} else {
			number += speed;
			if (number > target) {
				number = target;
			}
		}
	}

	return number;
}


export function popMessage(message, x, y, ttl = 1000) {
	let pop = document.createElement('div');
	pop.innerHTML = message;
	pop.classList.add('message');
	pop.style.left = x + 'px';
	pop.style.top = y + 'px';

	document.body.appendChild(pop);
	setTimeout(() => {
		document.body.removeChild(pop);
		pop = null;
	}, ttl);
}