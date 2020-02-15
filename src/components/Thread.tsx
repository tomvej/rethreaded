import React, {FC} from 'react';
import {toHex} from '~utils/color';
import {Color} from '~types';

import style from './Thread.scss';

type ThreadProps = {
    color: Color;
    label?: string;
};

const Thread: FC<ThreadProps> = ({label, color}) => (
    <div
        className={style.main}
        style={{backgroundColor: toHex(color)}}
    >
        {label}
    </div>
);

export default Thread;
