import {Hole, Tablet} from '~types';

export const noop = (): void => {/* do nothing */};

export const seq = (length: number): number[] => Array.from({length}).map((_, index) => index);

export function update<T, K extends keyof T>(object: T, index: K, updater: (value: T[K]) => T[K]): T;
export function update<T>(target: T[], index: number, updater: (value: T) => T): T[];
export function update(target: any, index: any, updater: (value: any) => any): any {
    if (Array.isArray(target)) {
        return target.map((item, i) => i === index ? updater(item) : item);
    } else if (typeof target === 'object' && target !== null) {
        return ({
            ...target,
            [index]: updater(target[index]),
        });
    }
}

export const updateTablet = <T>(tablet: Tablet<T>, hole: Hole, updater: (target: T) => T): Tablet<T> => {
    const newTablet: Tablet<T> = [tablet[0], tablet[1], tablet[2], tablet[3]];
    newTablet[hole] = updater(newTablet[hole]);
    return newTablet;
};

export const mapTablet = <T, U>(tablet: Tablet<T>, mapper: (target: T) => U): Tablet<U> => [
    mapper(tablet[0]),
    mapper(tablet[1]),
    mapper(tablet[2]),
    mapper(tablet[3]),
];

export const aperture = <T>(array: Array<T>, length: number): Array<Array<T>> => seq(Math.ceil(array.length / length))
    .map((index) => array.slice(index * length, (index + 1) * length));

export const insert = <T>(array: Array<T>, index: number, element: T): Array<T> => array.slice(0, index).concat([element], array.slice(index));

export const remove = <T>(array: Array<T>, index: number): Array<T> => array.slice(0, index).concat(array.slice(index + 1));
