import {MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, MOVE_UP, SET_S_THREADING, SET_Z_THREADING} from '~shortcuts';

import {
    selectNextHole,
    selectNextTablet,
    selectPreviousHole,
    selectPreviousTablet,
    setSThreading,
    setZThreading,
} from './actions';

export default {
    [MOVE_LEFT]: selectPreviousTablet,
    [MOVE_RIGHT]: selectNextTablet,
    [MOVE_UP]: selectNextHole,
    [MOVE_DOWN]: selectPreviousHole,
    [SET_S_THREADING]: setSThreading,
    [SET_Z_THREADING]: setZThreading,
}
