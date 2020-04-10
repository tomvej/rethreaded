import * as t from 'io-ts';

const TwtThreading = t.keyof({
    '/': null,
    '\\': null,
});

const TwtDirection = t.keyof({
    F: null,
    B: null,
});

export const TwtFile = t.type({
    source: t.string,
    version: t.string,
    Name: t.string,
    Description: t.string,
    Tags: t.array(t.string),
    'Pattern type': t.string,
    'Number of holes': t.number,
    'Colour palette': t.array(t.string),
    'Weft colour': t.number,
    'Number of tablets': t.number,
    'Number of weaving rows': t.number,
    'Threading chart': t.array(t.array(t.number)),
    'Tablet orientations': t.array(TwtThreading),
    'Pattern design': t.type({
        weavingInstructions: t.array(t.array(t.type({
            direction: TwtDirection,
            numberOfTurns: t.number,
        }))),
    }),
});
