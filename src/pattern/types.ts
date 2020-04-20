import {Color, Direction, Hole, Tablet, ThreadingType} from '~types';

export type ThreadId = number;
export type TabletId = number;
export type RowId = number;

export type SelectionState = {
    row: RowId;
    thread: ThreadId;
    tablet: TabletId;
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
        threads: Array<Tablet<number>>;
        threading: Array<ThreadingType>;
    };
    weaving: Array<Array<Direction>>;
}
