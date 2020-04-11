export const noop = (): void => {/* do nothing */};

export const increment = (limit: number) => (value: number) => value < limit - 1 ? value + 1 : 0;
export const decrement = (limit: number) => (value: number) => value > 0 ? value - 1 : limit - 1;

export const update = <T, K extends keyof T>(index: K, updater: (value: T[K]) => T[K]) => (target: T): T => {
    const elem = target[index];
    const updated = updater(elem);
    if (updated !== elem) {
        return ({
            ...target,
            [index]: updated,
        });
    } else {
        return target;
    }
};
