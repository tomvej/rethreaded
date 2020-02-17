import classnames from 'classnames';
import React, {FunctionComponent} from 'react';

import {Color, Direction, ThreadingType} from '~types';
import {toHex} from '~utils/color';

import style from './ThreadingCell.scss';

const getDirectionStyle = (direction: Direction): string => ({
    [Direction.Forward]: style.forward,
    [Direction.Backward]: style.backward,
}[direction]);

const getDirectionScale = (direction: Direction): number => ({
    [Direction.Forward]: 1,
    [Direction.Backward]: -1,
}[direction]);

const getThreadingScale = (threading: ThreadingType): number => ({
    [ThreadingType.S]: 1,
    [ThreadingType.Z]: -1
}[threading]);

type ThreadingProps = {
    direction: Direction;
    threading: ThreadingType;
    color: Color;
    focus: boolean;
}

const ThreadingCell: FunctionComponent<ThreadingProps> = ({direction, threading, color, focus}) => (
    <svg
        className={classnames(
            style.main,
            getDirectionStyle(direction),
            {[style.focus]: focus},
        )}
        viewBox="-128 -128 256 256"
    >
        <g transform={`scale(${getDirectionScale(direction)},${getThreadingScale(threading)})`}>
            <ellipse
                transform="rotate(-45)"
                cx={0}
                cy={0}
                rx={140}
                ry={60}
                strokeWidth={10}
                fill={toHex(color)}
            />
        </g>
    </svg>
);

export default ThreadingCell;
