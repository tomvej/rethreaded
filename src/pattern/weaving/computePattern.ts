import {Color, Direction, Hole, Tablet} from '~types';

import {RowId} from '../types';

const inc = (hole: Hole): Hole => (hole + 1) % 4;
const dec = (hole: Hole): Hole => (hole + 3) % 4;

export default (directions: Record<RowId, Direction>, colors: Tablet<Color>, rows: Array<RowId>): Record<RowId, Color> => {
    const result = {} as Record<RowId, Color>;
    let hole = Hole.A;
    rows.forEach((row) => {
        switch (directions[row]) {
            case Direction.Forward:
                result[row] = colors[hole];
                hole = inc(hole);
                break;
            case Direction.Backward:
                hole = dec(hole);
                result[row] = colors[hole];
                break;
        }
    });
    return result;
};
