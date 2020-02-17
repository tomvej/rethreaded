export const noop = (): void => {/* do nothing */};

export const seq = (length: number): number[] => Array.from({length}).map((_, index) => index);

export const updateObject = <T, K extends keyof T>(object: T, prop: K, updater: (target: T[K]) => T[K]): T => Object.assign({
    ...object,
    [prop]: updater(object[prop]),
});

export const updateArray = <T>(array: T[], index: number, updater: (target: T) => T) => array.map(
    (item, i) => i === index ? updater(item) : item,
);
