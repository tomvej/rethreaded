import classnames from 'classnames';
import React, {FC, ReactNode} from 'react';

import style from './CellLabel.scss';

type Position = 'top' | 'bottom' | 'left' | 'right';

type CellLabelPropTypes = {
    position: Position;
    children: ReactNode;
}

const getSizeStyle = (position: Position): string => {
    switch (position) {
        case 'left':
        case 'right':
            return style.vertical;
        case 'bottom':
        case 'top':
            return style.horizontal;
    }
};

const CellLabel: FC<CellLabelPropTypes> = ({position, children}) => (
    <div className={classnames(style.main, getSizeStyle(position))}>
        {children}
    </div>
);

export default CellLabel;
