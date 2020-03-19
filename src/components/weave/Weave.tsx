import React, {FC} from 'react';

import {Color, Direction, ThreadingType} from '~types';
import {toHex} from '~utils/color';

import {THREAD_WIDTH, WEAVE_LENGTH} from './constants';
import style from './Weave.scss';

const HALF_WIDTH = THREAD_WIDTH / 2;
const getPoints = (points: number[][]): string => points.map((point) => point.map(String).join(',')).join(' ');
const continuePoints = getPoints([
    [-HALF_WIDTH, -WEAVE_LENGTH],
    [-HALF_WIDTH, 0],
    [HALF_WIDTH, WEAVE_LENGTH],
    [HALF_WIDTH, 0],
]);
const switchPoints = getPoints([
    [-HALF_WIDTH, 0],
    [HALF_WIDTH, WEAVE_LENGTH],
    [HALF_WIDTH, -WEAVE_LENGTH],
]);

const getDirectionScale = (direction: Direction): number => {
    switch (direction) {
        case Direction.Forward:
            return 1;
        case Direction.Backward:
            return -1;
    }
};
const getThreadingScale = (threading: ThreadingType): number => {
    switch (threading) {
        case ThreadingType.S:
            return 1;
        case ThreadingType.Z:
            return -1;
    }
};
const getScale = (direction: Direction, threading: ThreadingType): number => getThreadingScale(threading) * getDirectionScale(direction);

type WeavePropTypes = {
    threading: ThreadingType;
    direction: Direction;
    prevDirection: Direction;
    color: Color;
}

const Weave: FC<WeavePropTypes> = ({color, direction, prevDirection, threading}) => (
    <polygon
        transform={`scale(${getScale(direction, threading)}, 1)`}
        points={direction === prevDirection ? continuePoints : switchPoints}
        fill={toHex(color)}
        className={style.main}
    />
);

export default Weave;
