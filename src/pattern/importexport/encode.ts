import {map, reduce, replicate, snoc, zipWith} from 'fp-ts/es6/Array';
import {pipe} from 'fp-ts/es6/pipeable';

import {Direction, ThreadingType} from '~types';

import {IOShape} from '../types';
import {BasicTwtFileType, TwtDirectionType, TwtThreadingType} from './types';

const encodeThreading = (threading: ThreadingType): TwtThreadingType => {
    switch (threading) {
        case ThreadingType.S:
            return '/';
        case ThreadingType.Z:
            return '\\';
    }
}

const encodeDirection = (direction: Direction): TwtDirectionType => {
    switch (direction) {
        case Direction.Backward:
            return 'B';
        case Direction.Forward:
            return 'F';
    }
}

export default function encode(data: IOShape): BasicTwtFileType {
    const threadingChart = pipe(
        data.threading.threads,
        reduce(
            replicate(4, [] as number[]),
            (result, tablet) => zipWith(result, tablet, snoc),
        ),
    )

    return {
        source: 'Twisted Threads',
        version: '2.0',
        Name: data.name,
        Description: data.description,
        Tags: data.tags.split(','),
        'Pattern type': 'individual',
        'Number of holes': 4,
        'Colour palette': data.threads,
        'Weft colour': 0,
        'Number of tablets': data.threading.threading.length,
        'Number of weaving rows': data.weaving.length,
        'Threading chart': threadingChart,
        'Tablet orientations': map(encodeThreading)(data.threading.threading),
        'Pattern design': {
            weavingInstructions: data.weaving.map(map((direction) => ({
                direction: encodeDirection(direction),
                numberOfTurns: 1,
            }))),
        },
    };
}
