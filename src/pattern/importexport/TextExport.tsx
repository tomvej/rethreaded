import * as array from 'fp-ts/es6/Array';
import {pipe} from 'fp-ts/es6/pipeable';
import React, {FC} from 'react';
import {connect} from 'react-redux';

import {RootState} from '~reducer';
import {Direction} from '~types';

import {exportWeaving} from '../weaving';

// TODO ineffective -- is that a problem?
const mapStateToProps = (state: RootState) => ({
    directions: exportWeaving(state),
});

const getDirection = (direction: Direction): string => {
    switch (direction) {
        case Direction.Forward:
            return 'F';
        case Direction.Backward:
            return 'B';
    }
}

const group = <A,>(target: A[]): [A, number][] => pipe(
    target,
    array.chop((tail) => {
        const current = tail[0];
        const {init, rest} = pipe(tail, array.spanLeft((head) => head === current));
        return [[current, init.length], rest];
    }),
);


const mapRow = (row: Direction[]): string => pipe(
    row,
    group,
    array.map(([dir, number]) => `${number}${getDirection(dir)}`),
    (arr) => arr.join(' '),
);


type TextExportProps = ReturnType<typeof mapStateToProps>;

const TextExport: FC<TextExportProps> = ({directions}) => (
    <div>{
        pipe(
            directions,
            array.map(mapRow),
            array.mapWithIndex((i, row) => <div key={i}>{i+1}: {row}</div>),
            array.reverse,
        )
    }</div>
)

export default connect(mapStateToProps)(TextExport);
