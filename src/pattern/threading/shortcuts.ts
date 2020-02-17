import {MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, MOVE_UP, SELECT_THREAD_1, SET_S_THREADING, SET_Z_THREADING} from '~shortcuts';

import {
    selectNextHole,
    selectNextTablet,
    selectPreviousHole,
    selectPreviousTablet,
    selectThread,
    SelectThreadActionType,
    setSThreading,
    setZThreading,
} from './actions';

const createSelectThread = (number: number) => (): SelectThreadActionType => selectThread(number);

export default {
    [MOVE_LEFT]: selectPreviousTablet,
    [MOVE_RIGHT]: selectNextTablet,
    [MOVE_UP]: selectNextHole,
    [MOVE_DOWN]: selectPreviousHole,
    [SET_S_THREADING]: setSThreading,
    [SET_Z_THREADING]: setZThreading,
    [SELECT_THREAD_1]: createSelectThread(0),
}
