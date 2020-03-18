import {Direction} from '~types';
import {seq, update} from '~utils/array';

import {ActionType, SELECT_AND_TOGGLE_DIRECTION} from '../actions';
import {INIT_TABLET_NUMBER} from '../constants';

const INIT_ROWS = 4;

const getOtherDirection = (direction: Direction): Direction => {
    switch (direction) {
        case Direction.Forward:
            return Direction.Backward;
        case Direction.Backward:
            return Direction.Forward;
    }
};

export type StateType = Array<Array<Direction>>;
const initState = seq(INIT_ROWS).map(() => Array(INIT_TABLET_NUMBER).fill(Direction.Forward));
export default (state: StateType = initState, action: ActionType): StateType => {
    switch (action.type) {
        case SELECT_AND_TOGGLE_DIRECTION:
            return update(action.row, update(action.tablet, getOtherDirection))(state);
        default:
            return state;
    }
};
