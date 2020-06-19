import {map, mapWithIndex} from 'fp-ts/es6/Array';

export * from 'fp-ts/es6/Array';

export const addIndices = <I, T>(getIndex: (index: number) => I): (target: Array<T>) => Array<[I, T]> =>
    mapWithIndex((index, element) => [getIndex(index), element]);

export const addValues = <I, T>(getValue: (index: I) => T): (target: Array<I>) => Array<[I, T]> =>
    map((index) => [index, getValue(index)]);

/** @deprecated */
const seq = (length: number): number[] => Array.from({length}).map((_, index) => index);

/** @deprecated */
export const aperture = <T>(array: Array<T>, length: number): Array<Array<T>> => seq(Math.ceil(array.length / length))
    .map((index) => array.slice(index * length, (index + 1) * length));
