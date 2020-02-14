import React, {FunctionComponent} from 'react';
import {Color} from '../types';
import {toHex} from '../utils/color';

import style from './Thread.scss';

type ThreadColorProps = {
    color: Color;
    label?: string;
};

const Thread: FunctionComponent<ThreadColorProps> = ({label, color}) => (
    <div
        className={style.main}
        style={{backgroundColor: toHex(color)}}
    >
        {label}
    </div>
);

export default Thread;
