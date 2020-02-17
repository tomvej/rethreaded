import classnames from 'classnames';
import React, {FC} from 'react';

import {Color} from '~types';
import {contrastRatio, fromHex, toHex} from '~utils/color';

import style from './Thread.scss';

type ThreadProps = {
    color: Color;
    onClick: () => void;
    active: boolean;
    label?: string;
};

const black = fromHex('#000000'); // TODO import from scss?

const Thread: FC<ThreadProps> = ({label, color, onClick, active}) => (
    <div
        className={classnames(style.main, {
            [style.dark]: contrastRatio(color, black) < 3,
            [style.active]: active,
        })}
        style={{backgroundColor: toHex(color)}}
        onClick={onClick}
    >
        {label}
    </div>
);

export default Thread;
