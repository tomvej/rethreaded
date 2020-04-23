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
export const update = <T>(index: number, updater: (item: T) => T) => (array: Array<T>): Array<T> => {
    const elem = array[index];
    const updated = updater(elem);
    if (updated !== elem) {
        return array.map((item, i) => i === index ? updated : item);
    } else {
        return array;
    }
};

/** @deprecated */
export const insert = <T>(array: Array<T>, index: number, item: T): Array<T> => array.slice(0, index).concat([item], array.slice(index));

/** @deprecated */
export const remove = (index: number) => <T>(array: Array<T>): Array<T> => array.filter((_, i) => i !== index);

/** @deprecated */
export const append = <T>(array: Array<T>, item: T): Array<T> => array.concat([item]);
