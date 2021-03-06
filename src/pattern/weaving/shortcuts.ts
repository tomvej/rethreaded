import {
    ADD,
    ADD_ALT,
    APPLY,
    MOVE_DOWN,
    MOVE_LEFT,
    MOVE_RIGHT,
    MOVE_UP,
    REMOVE,
    TURN_BACKWARD,
    TURN_FORWARD,
} from '~shortcuts';
import {Direction} from '~types';

import {addRowAfter, addRowBefore, removeRow} from '../actions';
import {selectNextRow, selectNextTablet, selectPrevRow, selectPrevTablet} from '../selection';
import {setDirection, toggleDirection} from './actions';

export default {
    [MOVE_LEFT]: selectPrevTablet,
    [MOVE_RIGHT]: selectNextTablet,
    [MOVE_UP]: selectNextRow,
    [MOVE_DOWN]: selectPrevRow,
    [APPLY]: toggleDirection,
    [TURN_FORWARD]: () => setDirection(Direction.Forward),
    [TURN_BACKWARD]: () => setDirection(Direction.Backward),
    [ADD]: addRowAfter,
    [ADD_ALT]: addRowBefore,
    [REMOVE]: removeRow,
}
