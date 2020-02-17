import classnames from 'classnames';
import React, {FC} from 'react';

import {Color} from '~types';
import {contrastRatio, fromHex, toHex} from '~utils/color';

import style from './Thread.scss';

type ThreadProps = {
    color: Color;
    label?: string;
};

const black = fromHex('#000000'); // TODO import from scss?

const Thread: FC<ThreadProps> = ({label, color}) => (
    <div
        className={classnames(style.main, {[style.dark]: contrastRatio(color, black) < 3})}
        style={{backgroundColor: toHex(color)}}
    >
        {label}
    </div>
);

export default Thread;
