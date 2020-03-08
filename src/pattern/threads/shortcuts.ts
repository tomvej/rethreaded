import {
    ADD,
    ADD_ALT,
    APPLY,
    MOVE_LEFT,
    MOVE_RIGHT,
    SELECT_THREAD_1,
    SELECT_THREAD_2,
    SELECT_THREAD_3,
} from '~shortcuts';

import {addThread} from '../actions';
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
    [ADD]: addThread,
    [ADD_ALT]: addThread,
};
