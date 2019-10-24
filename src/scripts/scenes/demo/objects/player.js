import { MouseLook } from 'components/controls/mouse-look';
import { Walk } from 'components/controls/walk';
import { Click } from 'components/controls/click';
import { Crouch } from 'components/controls/crouch';
import { Focus } from 'components/controls/focus';

function Player() {
	return {
		components: [
			MouseLook(),
			Walk(),
			Click(),
			Crouch(),
			Focus()
		]
	}
}

export default Player;
