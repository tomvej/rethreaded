export const noop = (): void => {/* do nothing */};

export const seq = (length: number): number[] => Array.from({length}).map((_, index) => index);
