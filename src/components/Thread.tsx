import classnames from 'classnames';
import React, {forwardRef, ForwardRefRenderFunction} from 'react';

import {Color} from '~types';
import {contrastRatio, fromHex, toHex} from '~utils/color';

import style from './Thread.scss';

type ThreadProps = {
    color: Color;
    onClick: () => void;
    active: boolean;
    label?: string;
    focus: boolean;
};

const black = fromHex('#000000'); // TODO import from scss?

const Thread: ForwardRefRenderFunction<HTMLDivElement, ThreadProps> = ({label, color, onClick, focus, active}, ref?) => (
    <div
        className={classnames(style.main, {
            [style.dark]: contrastRatio(color, black) < 3,
            [style.active]: active,
            [style.focus]: focus,
        })}
        style={{backgroundColor: toHex(color)}}
        onClick={onClick}
        ref={ref}
    >
        {label}
    </div>
);

export default forwardRef(Thread);
