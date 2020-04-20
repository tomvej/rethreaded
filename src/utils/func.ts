export const noop = (): void => {/* do nothing */};

export const increment = (limit: number) => (value: number): number => value < limit - 1 ? value + 1 : 0;
export const decrement = (limit: number) => (value: number): number => value > 0 ? value - 1 : limit - 1;
