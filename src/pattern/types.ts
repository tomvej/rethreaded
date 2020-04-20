import {Color, Direction, Hole, Tablet, ThreadingType} from '~types';

export type ThreadId = string;
export type TabletId = number;
export type RowId = number;

export type SelectionState = {
    row: RowId;
    thread: number;
    tablet: TabletId;
    hole: Hole;
}

export type Context = {
    selection: SelectionState;
    threads: Array<ThreadId>;
    tablets: number;
    rows: number;
}

export type IOShape = {
    name: string;
    description: string;
    tags: string;
    threads: Array<Color>;
    threading: {
        threads: Array<Tablet<number>>;
        threading: Array<ThreadingType>;
    };
    weaving: Array<Array<Direction>>;
}
