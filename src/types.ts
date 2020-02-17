export type Color = [number, number, number];
export enum ColorCmp {
    RED = 0,
    GREEN = 1,
    BLUE = 2,
}

export enum ThreadingType {S, Z}
export enum Direction {Forward, Backward}

export enum Hole {A = 0, B = 1, C = 2, D = 3}
export type Tablet<T> = [T, T, T, T];
