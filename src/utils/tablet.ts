import {Hole, Tablet} from '~types';

export const update = <T>(hole: Hole, updater: (target: T) => T) => (tablet: Tablet<T>): Tablet<T> => {
    const value = tablet[hole];
    const updated = updater(value);
    if (value !== updated) {
        const newTablet: Tablet<T> = [tablet[0], tablet[1], tablet[2], tablet[3]];
        newTablet[hole] = updater(newTablet[hole]);
        return newTablet;
    } else {
        return tablet;
    }
};

export const map = <T, U>(mapper: (target: T) => U) => (tablet: Tablet<T>): Tablet<U> => [
    mapper(tablet[0]),
    mapper(tablet[1]),
    mapper(tablet[2]),
    mapper(tablet[3]),
];
