import {Hole} from '~types';

export type SelectionState = {
    row: number;
    thread: number;
    tablet: number;
    hole: Hole;
}

export type Context = {
    selection: SelectionState;
    threads: number;
    tablets: number;
    rows: number;
}
