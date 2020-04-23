export * from 'fp-ts/es6/Record';

export declare function deleteAt<K extends string>(k: K): <A>(r: Record<K, A>) => Record<K, A>;

/** @deprecated */
type KeyType = string | number | symbol;

/** @deprecated */
export const update = <T, K extends KeyType>(index: K, updater: (value: T) => T) => (target: Record<K, T>): Record<K, T> => {
    const element = target[index];
    const updated = updater(element);
    if (element !== updated) {
        return {
            ...target,
            [index]: updated,
        }
    } else {
        return target;
    }
}

/** @deprecated */
export const remove = <K extends KeyType>(index: K) => <T>(target: Record<K, T>): Record<K, T> => Object
    .entries(target)
    .filter(([key]) => key !== index)
    .reduce((result, [key, value]) => Object.assign(result, {[key]: value}), {} as Record<K, T>);

/** @deprecated */
export const fromEntries = <K extends KeyType, T>(entries: Array<[K, T]>): Record<K, T> =>
    entries.reduce((result, [key, value]) => Object.assign(result, {[key]: value}), {} as Record<K, T>);
