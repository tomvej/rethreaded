import React, {FC} from 'react';
import classnames from 'classnames';
import {brightness, toHex} from '~utils/color';
import {Color} from '~types';

import style from './Thread.scss';

type ThreadProps = {
    color: Color;
    label?: string;
};

const Thread: FC<ThreadProps> = ({label, color}) => (
    <div
        className={classnames(style.main, {[style.dark]: brightness(color) < 128})}
        style={{backgroundColor: toHex(color)}}
    >
        {label}
    </div>
);

export default Thread;
