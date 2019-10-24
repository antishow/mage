import { PLAYER_CLICK } from 'components/controls/click';

export function Clickable(callback) {
	return function(object) {
		var self = object;

		function start() {
			self.addEventListener(PLAYER_CLICK, onClick);
		}

		function onClick(e) {
			if (callback) {
				callback(e);
			}
		}

		return { name: 'Clickable', start };
	}
}