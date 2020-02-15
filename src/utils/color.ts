import {Color} from '~types';
import {assert} from './assert';

export const fromHex = (color: string): Color => {
    assert(/^#[0-9a-fA-F]{6}$/.test(color), `${color} is not a hex color.`);

    return [
        parseInt(color.substr(1, 2), 16),
        parseInt(color.substr(3, 2), 16),
        parseInt(color.substr(5, 2), 16),
    ];
};

const format = (number: number): string => number.toString(16).padStart(2, '0');

export const toHex = (color: Color): string => `#${format(color[0])}${format(color[1])}${format(color[2])}`;
