import {mapWithIndex} from 'fp-ts/es6/Array';

export const noop = (): void => {/* do nothing */};

export const increment = (limit: number) => (value: number): number => value < limit - 1 ? value + 1 : 0;
export const decrement = (limit: number) => (value: number): number => value > 0 ? value - 1 : limit - 1;

type AddIndices<I, T> = (target: Array<T>) => Array<[I, T]>;
export const addIndices = <I, T>(getIndex: (index: number) => I): AddIndices<I, T> => mapWithIndex((index, element) => [getIndex(index), element]);
