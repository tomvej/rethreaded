import React, {FunctionComponent} from 'react';
import {Color} from '../types';
import {toHex} from '../utils/color';

import style from './Thread.scss';

type ThreadColorProps = {
    color: Color;
};

const Thread: FunctionComponent<ThreadColorProps> = ({color}) => (
    <div
        className={style.main}
        style={{backgroundColor: toHex(color)}}
    >

    </div>
);

export default Thread;
