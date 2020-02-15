import React, {FC} from 'react';
import {Color} from '~/types';
import {toHex} from '~/utils/color';

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
