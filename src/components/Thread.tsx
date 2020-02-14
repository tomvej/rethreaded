import React, {FunctionComponent} from 'react';

const style = require('./Thread.scss');

type ThreadColorProps = {
    color: string;
};

const Thread: FunctionComponent<ThreadColorProps> = ({color}) => (
    <div
        className={style.main}
        style={{backgroundColor: color}}
    >

    </div>
);

export default Thread;
