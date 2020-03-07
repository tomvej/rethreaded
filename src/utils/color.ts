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

// see https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio and https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
const relativeLuminanceComponent = (component: number): number => {
    const relative = component / 255;
    if (relative <= 0.03928) {
        return relative / 12.92;
    } else {
        return Math.pow((relative + 0.055) / 1.055, 2.4)
    }
};
export const relativeLuminance = (color: Color): number => (
    0.2126 * relativeLuminanceComponent(color[ColorCmp.RED])
    + 0.7152 * relativeLuminanceComponent(color[ColorCmp.GREEN])
    + 0.0722 * relativeLuminanceComponent(color[ColorCmp.BLUE])
);
export const contrastRatio = (color1: Color, color2: Color): number => {
    const luminance1 = relativeLuminance(color1) + 0.05;
    const luminance2 = relativeLuminance(color2) + 0.05;
    return Math.max(luminance1, luminance2) / Math.min(luminance1, luminance2);
};

export const isEqual = (color1: Color, color2: Color): boolean => (
    color1[ColorCmp.RED] === color2[ColorCmp.RED]
    && color1[ColorCmp.GREEN] === color2[ColorCmp.GREEN]
    && color1[ColorCmp.BLUE] === color2[ColorCmp.BLUE]
);
