import React, {FC, ReactNode, useCallback, useEffect, useRef, useState} from 'react';

import {seq} from '~func/array';

import {THREAD_WIDTH, WEAVE_LENGTH} from './constants';
import style from './WeaveTable.scss';

type Key = string | number;

type WeaveComponentPropTypes<T extends Key, R extends Key> = {
    tablet: T;
    row: R;
}

type WeaveTablePropTypes<T extends Key, R extends Key> = {
    weaveComponent: FC<WeaveComponentPropTypes<T, R>>;
    tablets: T[];
    rows: R[];
    repeat?: number;
};

const WeaveTable = <T extends Key, R extends Key>({tablets, rows, weaveComponent: WeaveComponent, repeat = 1}: WeaveTablePropTypes<T, R>) => {
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

    const width = tablets.length * THREAD_WIDTH;
    const height = (rows.length + 1) * WEAVE_LENGTH * repeat;

    const createLine = (tablet: T): ReactNode => seq(repeat).map((repetition) => rows.map((row, index) => (
        <g
            key={row}
            transform={`translate(0, ${(repetition * rows.length + index) * WEAVE_LENGTH})`}
        >
            <WeaveComponent tablet={tablet} row={row} />
        </g>
    )))
    return (
        <svg
            viewBox={`${-THREAD_WIDTH / 2}, ${-WEAVE_LENGTH}, ${width}, ${height}`}
            width={width / zoom}
            height={height / zoom}
            className={style.main}
            ref={ref}
        >
            {tablets.map((tablet, index) => (
                <g
                    key={tablet}
                    transform={`translate(${index * THREAD_WIDTH})`}
                >
                    {createLine(tablet)}
                </g>
            ))}
        </svg>
    );
};

export default WeaveTable;
