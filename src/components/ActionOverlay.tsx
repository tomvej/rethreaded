import classnames from 'classnames';
import React, {FC, ReactNode} from 'react';

import style from './ActionOverlay.scss';

type ActionOverlayPropTypes = {
    children: ReactNode;
    topRight?: ReactNode;
    topLeft?: ReactNode;
    bottomRight?: ReactNode;
    bottomLeft?: ReactNode;
    top?: ReactNode;
    left?: ReactNode;
    bottom?: ReactNode;
    right?: ReactNode;
    fill?: boolean;
};


const ActionOverlay: FC<ActionOverlayPropTypes> = ({
    topRight,
    topLeft,
    bottomLeft,
    bottomRight,
    top,
    left,
    bottom,
    right,
    fill,
    children,
}) => (
    <div className={classnames(style.main, {
        [style.fill]: fill,
    })}>
        {children}
        {topLeft && <div className={classnames(style.overlay, style.topLeft)}>{topLeft}</div>}
        {topRight && <div className={classnames(style.overlay, style.topRight)}>{topRight}</div>}
        {bottomLeft && <div className={classnames(style.overlay, style.bottomLeft)}>{bottomLeft}</div>}
        {bottomRight && <div className={classnames(style.overlay, style.bottomRight)}>{bottomRight}</div>}
        {top && <div className={classnames(style.overlay, style.top)}>{top}</div>}
        {left && <div className={classnames(style.overlay, style.left)}>{left}</div>}
        {bottom && <div className={classnames(style.overlay, style.bottom)}>{bottom}</div>}
        {right && <div className={classnames(style.overlay, style.right)}>{right}</div>}
    </div>
);

export default ActionOverlay;
