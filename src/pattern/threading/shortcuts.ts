import {
    MOVE_DOWN,
    MOVE_LEFT,
    MOVE_RIGHT,
    MOVE_UP,
    SELECT_THREAD_1,
    SELECT_THREAD_2, SELECT_THREAD_3,
    SET_S_THREADING,
    SET_Z_THREADING,
} from '~shortcuts';

import {selectNextHole, selectNextTablet, selectPrevHole, selectPrevTablet} from '../selection';
import {applyThread, setSThreading, setZThreading} from './actions';

const createSelectThread = (number: number) => () => applyThread(number);

export default {
    [MOVE_LEFT]: selectPrevTablet,
    [MOVE_RIGHT]: selectNextTablet,
    [MOVE_UP]: selectNextHole,
    [MOVE_DOWN]: selectPrevHole,
    [SET_S_THREADING]: setSThreading,
    [SET_Z_THREADING]: setZThreading,
    [SELECT_THREAD_1]: createSelectThread(0),
    [SELECT_THREAD_2]: createSelectThread(1),
    [SELECT_THREAD_3]: createSelectThread(2),
}
