import { activeScene } from 'scene-manager';
import { PLAYER_CLICK } from 'components/controls/click';

export function Clickable(callback) {
	return function(object) {
		var self = object;

		function start() {
			if (self.type === 'Group') {
				self.traverse(initializeObject);
			} else {
				initializeObject(self);
			}
		}

		function initializeObject(o) {
			if (o.type !== 'Mesh') {
				return;
			}

			o.addEventListener(PLAYER_CLICK, onClick);

			if (!activeScene.clickables) {
				activeScene.clickables = [];
			}

			if (!activeScene.clickables.includes(o)) {
				activeScene.clickables.push(o);
			}
		}

		function onClick(e) {
			if (callback) {
				callback(e, self);
			}
		}

		return { name: 'Clickable', start };
	}
}
