import React, {FC} from 'react';

import {THREAD_WIDTH, WEAVE_LENGTH} from './constants';

type WeaveComponentPropTyps = {
    tablet: number;
    row: number;
}

type WeaveTablePropTypes = {
    weaveComponent: FC<WeaveComponentPropTyps>;
    tablets: Array<number>;
    rows: Array<number>;
};

const WeaveTable: FC<WeaveTablePropTypes> = ({tablets, rows, weaveComponent: WeaveComponent}) => (
    <g>
        {tablets.map((tablet) => (rows.map((row) => (
            <g
                key={`${tablet}-${row}`}
                transform={`translate(${tablet * THREAD_WIDTH}, ${row * WEAVE_LENGTH})`}
            >
                <WeaveComponent tablet={tablet} row={row} />
            </g>
        ))))}
    </g>
);

export default WeaveTable;
