import {MOVE_LEFT, MOVE_RIGHT} from '~shortcuts';

import {selectNextThread, selectPrevThread} from '../selection';

export default {
    [MOVE_LEFT]: selectPrevThread,
    [MOVE_RIGHT]: selectNextThread,
};
