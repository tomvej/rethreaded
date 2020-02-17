import {MOVE_LEFT, MOVE_RIGHT} from '~shortcuts';

import {selectNext, selectPrevious} from './actions';

export default {
    [MOVE_LEFT]: selectPrevious,
    [MOVE_RIGHT]: selectNext,
};
