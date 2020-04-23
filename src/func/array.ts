import {mapWithIndex} from 'fp-ts/es6/Array';

export * from 'fp-ts/es6/Array';

export const addIndices = <I, T>(getIndex: (index: number) => I): (target: Array<T>) => Array<[I, T]> =>
    mapWithIndex((index, element) => [getIndex(index), element]);

/** @deprecated */
export const seq = (length: number): number[] => Array.from({length}).map((_, index) => index);

/** @deprecated */
export const aperture = <T>(array: Array<T>, length: number): Array<Array<T>> => seq(Math.ceil(array.length / length))
    .map((index) => array.slice(index * length, (index + 1) * length));

/** @deprecated */
export const append = <T>(array: Array<T>, item: T): Array<T> => array.concat([item]);
