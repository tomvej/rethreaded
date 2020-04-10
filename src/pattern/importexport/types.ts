import * as t from 'io-ts';

const TwtThreading = t.keyof({
    '/': null,
    '\\': null,
});

export type TwtThreadingType = t.TypeOf<typeof TwtThreading>;

const TwtDirection = t.keyof({
    F: null,
    B: null,
});

export type TwtDirectionType = t.TypeOf<typeof TwtDirection>;

export const TwtFile = t.type({
    source: t.string,
    version: t.literal('2.0'),
    Name: t.string,
    Description: t.string,
    Tags: t.array(t.string),
    'Pattern type': t.literal('individual'),
    'Number of holes': t.literal(4),
    'Colour palette': t.array(t.string),
    'Weft colour': t.number,
    'Number of tablets': t.number,
    'Number of weaving rows': t.number,
    'Threading chart': t.array(t.array(t.number)),
    'Tablet orientations': t.array(TwtThreading),
    'Pattern design': t.type({
        weavingInstructions: t.array(t.array(t.type({
            direction: TwtDirection,
            numberOfTurns: t.literal(1),
        }))),
    }),
});

// FIXME integrity validations

export type TwtFileType = t.TypeOf<typeof TwtFile>;
