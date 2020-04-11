import {Color, Direction, Hole, Tablet, ThreadingType} from '~types';

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

export type IOShape = {
    name: string;
    description: string;
    tags: string;
    threads: Array<Color>;
    threading: {
        colors: Array<Tablet<number>>;
        threading: Array<ThreadingType>;
    };
    weaving: Array<Array<Direction>>;
}
