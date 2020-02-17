export const noop = (): void => {/* do nothing */};

export const seq = (length: number): number[] => Array.from({length}).map((_, index) => index);

export const update = <T, K extends keyof T>(object: T, prop: K, updater: (target: T[K]) => T[K]): T => Object.assign({
    ...object,
    [prop]: updater(object[prop]),
});
