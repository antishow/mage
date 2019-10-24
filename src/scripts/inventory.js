export function applyGameState(state) {
	let inv = state.inventory;

	let el = document.getElementById('inventory-select');
	if (el) {
		document.body.removeChild(el);
	}

	document.body.appendChild(toSelect(inv));

}

function toSelect(inventory) {
	let ret = document.createElement('select');
	ret.name = 'inventory';
	ret.id = 'inventory-select';
	ret.classList.add('inventory-select');

	let blank = document.createElement('option');
	ret.appendChild(blank);

	for(var i in inventory) {
		let item = inventory[i];
		let opt = document.createElement('option');

		opt.value = item;
		opt.innerText = item;
		ret.appendChild(opt);
	}

	return ret;
}

export function getActiveItem() {
	let ret = false;
	let sel = document.getElementById('inventory-select');
	if (sel) {
		ret = sel.value;
	}

	return ret;
}
