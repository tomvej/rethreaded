type KeyType = string | number | symbol;

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

export const remove = <K extends KeyType>(index: K) => <T>(target: Record<K, T>): Record<K, T> => Object
    .entries(target)
    .filter(([key]) => key !== index)
    .reduce((result, [key, value]) => Object.assign(result, {[key]: value}), {} as Record<K, T>);
