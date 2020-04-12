import React, {FC, useCallback, useEffect, useRef, useState} from 'react';

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
    const [zoom, setZoom] = useState(1);
    const onWheel = useCallback((event) => {
        if (event.ctrlKey) {
            event.preventDefault();
            if (event.deltaY > 0) {
                setZoom((zoom) => zoom * 1.2);
            } else {
                setZoom((zoom) => zoom / 1.2);
            }
        }
    }, [setZoom]);
    const ref = useRef<SVGSVGElement>(null);
    useEffect(() => {
        if (ref.current) {
            const element = ref.current;
            element.addEventListener('wheel', onWheel, {passive: false}); // chrome has passive wheel listeners on default
            return () => element.removeEventListener('wheel', onWheel);
        }
    }, [ref.current, onWheel]);

    const width = tablets * THREAD_WIDTH;
    const height = (rows + 1) * WEAVE_LENGTH * repeat;
    return (
        <svg
            viewBox={`${-THREAD_WIDTH / 2}, ${-WEAVE_LENGTH}, ${width}, ${height}`}
            width={width / zoom}
            height={height / zoom}
            className={style.main}
            ref={ref}
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
