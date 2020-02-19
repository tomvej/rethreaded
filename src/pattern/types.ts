import {Hole} from '~types';

export type SelectionState = {
    thread: number;
    tablet: number;
    hole: Hole;
}

export type Setup = {
    threads: number;
    tablets: number;
}
