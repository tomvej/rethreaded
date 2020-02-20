import classnames from 'classnames';
import React, {FC} from 'react';

import {ThreadingType} from '~types';

import style from './TabletLine.scss';

type TabletLineProps = {
    threading: ThreadingType;
    onClick: () => void;
}

const getThreadingStyle = (threading: ThreadingType): string => {
    switch (threading) {
        case ThreadingType.S:
            return style.sThread;
        case ThreadingType.Z:
            return style.zThread;
    }
};

const TabletLine: FC<TabletLineProps> = ({threading, onClick}) => (
    <div className={style.wrapper}>
        <div
            className={style.main}
            onClick={onClick}
        >
            <div className={classnames(style.line, getThreadingStyle(threading))} />
        </div>
    </div>
);

export default TabletLine;
