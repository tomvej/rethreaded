import * as t from 'io-ts';
import {either} from 'fp-ts/es6/Either';
import {Color} from '~types';
import {fromHex, toHex} from '~utils/color';
import validate = WebAssembly.validate;

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

const HexColor = new t.Type<Color, string, unknown>(
    'HexColor',
    (unknown): unknown is Color => Array.isArray(unknown) && unknown.length === 3 && unknown.every((i) => typeof i === 'number'),
    (unknown, context) => either.chain(t.string.validate(unknown, context), unknownString => {
        if (/^#[0-9a-fA-F]{6}$/.test(unknownString)) {
            return t.success(fromHex(unknownString));
        } else {
            return t.failure(unknown, context);
        }
    }),
    (color) => toHex(color),
);


export const BasicTwtFile = t.type({
    source: t.literal('Twisted Threads'),
    version: t.literal('2.0'),
    Name: t.string,
    Description: t.string,
    Tags: t.array(t.string),
    'Pattern type': t.literal('individual'),
    'Number of holes': t.literal(4),
    'Colour palette': t.array(HexColor),
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
export type BasicTwtFileType = t.TypeOf<typeof BasicTwtFile>;
const isValidTwtFile = (twtFile: BasicTwtFileType): boolean => {
    const isThread = (number: number): boolean => number >= 0 && number < twtFile['Colour palette'].length;
    const isThreadSized = (array: Array<any>): boolean => array.length === twtFile['Number of tablets'];

    const {weavingInstructions} = twtFile['Pattern design'];

    return (
        twtFile['Colour palette'].length === 16
        && isThread(twtFile['Weft colour'])
        && twtFile['Threading chart'].length === twtFile['Number of holes']
        && twtFile['Threading chart'].every(isThreadSized)
        && twtFile['Tablet orientations'].length === twtFile['Number of tablets']
        && weavingInstructions.length === twtFile['Number of weaving rows']
        && weavingInstructions.every(isThreadSized)
    );
}

interface TwtFileBrand {
    readonly TwtFile: unique symbol;
}
export const TwtFile = t.brand(
    BasicTwtFile,
    (file): file is t.Branded<BasicTwtFileType, TwtFileBrand> => isValidTwtFile(file),
    'TwtFile',
)
export type TwtFileType = t.TypeOf<typeof TwtFile>;

export type InfoProperty = 'name' | 'description' | 'tags';

export type Info = Record<InfoProperty, string>;
