import {Color, ColorCmp} from '~types';
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
export const toHex = (color: Color): string => `#${format(color[ColorCmp.RED])}${format(color[ColorCmp.GREEN])}${format(color[ColorCmp.BLUE])}`;

// according to the HSP model: http://alienryderflex.com/hsp.html
export const brightness = (color: Color): number => Math.sqrt(
    .299 * Math.pow(color[ColorCmp.RED], 2)
    + .587 * Math.pow(color[ColorCmp.GREEN], 2)
    + .114 * Math.pow(color[ColorCmp.BLUE], 2)
);
