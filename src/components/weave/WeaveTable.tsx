import React, {FC} from 'react';

import {seq} from '~utils/array';

import {THREAD_WIDTH, WEAVE_LENGTH} from './constants';
import style from './WeaveTable.scss';

type WeaveComponentPropTyps = {
    tablet: number;
    row: number;
}

type WeaveTablePropTypes = {
    weaveComponent: FC<WeaveComponentPropTyps>;
    tablets: number;
    rows: number;
    repeat?: number;
};

const WeaveTable: FC<WeaveTablePropTypes> = ({tablets, rows, weaveComponent: WeaveComponent, repeat = 1}) => {
    const width = tablets * THREAD_WIDTH;
    const height = (rows + 1) * WEAVE_LENGTH * repeat;
    return (
        <svg
            viewBox={`${-THREAD_WIDTH / 2}, ${-WEAVE_LENGTH}, ${width}, ${height}`}
            width={width}
            height={height}
            className={style.main}
        >
            {seq(tablets).map((tablet) => (seq(rows * repeat).map((row) => (
                <g
                    key={`${tablet}-${row}`}
                    transform={`translate(${tablet * THREAD_WIDTH}, ${row * WEAVE_LENGTH})`}
                >
                    <WeaveComponent tablet={tablet} row={row % rows} />
                </g>
            ))))}
        </svg>
    );
};

export default WeaveTable;
