import {
    ADD,
    ADD_ALT,
    APPLY,
    MOVE_LEFT,
    MOVE_RIGHT,
    REMOVE,
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
} from '~shortcuts';

import {addThread, removeThread} from '../actions';
import {selectNextThread, selectPrevThread, selectThread} from '../selection';
import {showPicker} from './actions';

const createSelectThread = (thread: number) => () => selectThread(thread);

export default {
    [MOVE_LEFT]: selectPrevThread,
    [MOVE_RIGHT]: selectNextThread,
    [APPLY]: showPicker,
    [SELECT_THREAD_1]: createSelectThread(0),
    [SELECT_THREAD_2]: createSelectThread(1),
    [SELECT_THREAD_3]: createSelectThread(2),
    [SELECT_THREAD_4]: createSelectThread(3),
    [SELECT_THREAD_5]: createSelectThread(4),
    [SELECT_THREAD_6]: createSelectThread(5),
    [SELECT_THREAD_7]: createSelectThread(6),
    [SELECT_THREAD_8]: createSelectThread(7),
    [SELECT_THREAD_9]: createSelectThread(8),
    [SELECT_THREAD_0]: createSelectThread(9),
    [ADD]: addThread,
    [ADD_ALT]: addThread,
    [REMOVE]: removeThread,
};
