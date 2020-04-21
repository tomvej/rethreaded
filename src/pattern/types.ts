import {Color, Direction, Hole, Tablet, ThreadingType} from '~types';

enum ThreadIdEnum {_ = ''}
enum TabletIdEnum {_ = ''}

export type ThreadId = ThreadIdEnum & string;
export type TabletId = TabletIdEnum & string;
export type RowId = string;

export type SelectionState = {
    row: number;
    thread: number;
    tablet: number;
    hole: Hole;
}

export type Context = {
    selection: SelectionState;
    threads: Array<ThreadId>;
    tablets: Array<TabletId>;
    rows: Array<RowId>;
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
