import classnames from 'classnames';
import {Placement} from 'popper.js';
import React, {FC, ReactNode} from 'react';
import {Popper} from 'react-popper';

import styles from './Popup.scss';

const getPlacementStyle = (placement: Placement): string => {
    switch (placement) {
        case 'bottom':
        case 'bottom-end':
        case 'bottom-start':
            return styles.bottom;
        case 'top':
        case 'top-end':
        case 'top-start':
            return styles.top;
        case 'left':
        case 'left-end':
        case 'left-start':
            return styles.left;
        case 'right':
        case 'right-end':
        case 'right-start':
            return styles.right;
        default:
            return styles.main;
    }
};

type PopupProps = {
    children: ReactNode;
    placement?: Placement;
}

const Popup: FC<PopupProps> = ({placement, children}) => (
    <Popper placement={placement}>
        {({ref, style, arrowProps, placement}) => (
                <div ref={ref} style={style} className={classnames(styles.main, getPlacementStyle(placement))}>
                    <div className={styles.children}>
                    {children}
                    </div>
                    <div ref={arrowProps.ref} style={arrowProps.style} className={styles.arrow} />
                </div>
        )}
    </Popper>
);

export default Popup;
