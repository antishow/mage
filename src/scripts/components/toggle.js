export function Toggle(turnOnCallback, turnOffCallback) {
	return function(gameObject) {
		let isOn = false;

		function turnOff() {
			turnOffCallback();
			isOn = false;
		}

		function turnOn() {
			turnOnCallback();
			isOn = true;
		}

		function toggle() {
			if (isOn) {
				turnOff();
			} else {
				turnOn();
			}
		}

		return { name: 'Toggle', turnOff, turnOn, toggle };
	}
}
