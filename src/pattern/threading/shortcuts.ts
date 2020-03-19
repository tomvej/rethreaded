import {
    ADD, ADD_ALT,
    APPLY,
    MOVE_DOWN,
    MOVE_LEFT,
    MOVE_RIGHT,
    MOVE_UP, REMOVE,
    SELECT_THREAD_0,
    SELECT_THREAD_1,
    SELECT_THREAD_2,
    SELECT_THREAD_3,
    SELECT_THREAD_4,
    SELECT_THREAD_5,
    SELECT_THREAD_6,
    SELECT_THREAD_7,
    SELECT_THREAD_8,
    SELECT_THREAD_9,
    SET_S_THREADING,
    SET_Z_THREADING,
    TURN_BACKWARD,
    TURN_FORWARD,
} from '~shortcuts';

import {addTabletAfter, addTabletBefore, removeTablet} from '../actions';
import {selectNextHole, selectNextTablet, selectPrevHole, selectPrevTablet} from '../selection';
import {applyThread, setSThreading, setZThreading, turnTablet} from './actions';

const createApplyThread = (number?: number) => () => applyThread(number);

export default {
    [MOVE_LEFT]: selectPrevTablet,
    [MOVE_RIGHT]: selectNextTablet,
    [MOVE_UP]: selectNextHole,
    [MOVE_DOWN]: selectPrevHole,
    [SET_S_THREADING]: setSThreading,
    [SET_Z_THREADING]: setZThreading,
    [SELECT_THREAD_1]: createApplyThread(0),
    [SELECT_THREAD_2]: createApplyThread(1),
    [SELECT_THREAD_3]: createApplyThread(2),
    [SELECT_THREAD_4]: createApplyThread(3),
    [SELECT_THREAD_5]: createApplyThread(4),
    [SELECT_THREAD_6]: createApplyThread(5),
    [SELECT_THREAD_7]: createApplyThread(6),
    [SELECT_THREAD_8]: createApplyThread(7),
    [SELECT_THREAD_9]: createApplyThread(8),
    [SELECT_THREAD_0]: createApplyThread(9),
    [APPLY]: createApplyThread(),
    [TURN_FORWARD]: () => turnTablet(1),
    [TURN_BACKWARD]: () => turnTablet(-1),
    [ADD]: addTabletAfter,
    [ADD_ALT]: addTabletBefore,
    [REMOVE]: removeTablet,
}
