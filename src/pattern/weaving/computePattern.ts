import {Color, Direction, Hole, Tablet} from '~types';

const inc = (hole: Hole): Hole => (hole + 1) % 4;
const dec = (hole: Hole): Hole => (hole + 3) % 4;

export default (directions: Array<Direction>, colors: Tablet<Color>): Array<Color> => {
    const result = Array(directions.length);
    let hole = Hole.A;
    for (let row = 0; row < directions.length; row++) {
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
    }
    return result;
};
