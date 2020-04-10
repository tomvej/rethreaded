import {flatten, map, reduce, replicate, snoc, sort, uniq, zipWith} from 'fp-ts/es6/Array';
import {eqNumber} from 'fp-ts/es6/Eq';
import {flow} from 'fp-ts/es6/function';
import {ordNumber} from 'fp-ts/es6/Ord';
import {pipe} from 'fp-ts/es6/pipeable';

import {Direction, ThreadingType} from '~types';
import {fromHex} from '~utils/color';

import {IOShape} from '../types';
import {TwtDirectionType, TwtFileType, TwtThreadingType} from './types';

const decodeThreading = (threading: TwtThreadingType): ThreadingType => {
    switch (threading) {
        case '/':
            return ThreadingType.S;
        case '\\':
            return ThreadingType.Z;
    }
}

const decodeDirection = (direction: TwtDirectionType): Direction => {
    switch (direction) {
        case 'F':
            return Direction.Forward;
        case 'B':
            return Direction.Backward;
    }
}

export default function decode(twtFile: TwtFileType): IOShape | null {
    const threads = pipe(
        twtFile['Threading chart'],
        flatten,
        sort(ordNumber),
        uniq(eqNumber),
        map((i) => twtFile['Colour palette'][i]),
        map(fromHex),
    );
    const weaving = pipe(
        twtFile['Pattern design'].weavingInstructions,
        map(map(flow(
            ({direction}) => direction,
            decodeDirection,
        )))
    );
    const colors = pipe(
        twtFile['Threading chart'],
        reduce(
            replicate(twtFile['Number of tablets'], [] as number[]),
            (array, item) => zipWith(array, item, snoc),
        ),
    );

    return {
        name: twtFile.Name,
        description: twtFile.Description,
        tags: twtFile.Tags,
        threads,
        threading: {
            threading: map(decodeThreading)(twtFile['Tablet orientations']),
            colors,
        },
        weaving,
    };
}
