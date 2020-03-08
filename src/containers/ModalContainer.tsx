import {Placement} from 'popper.js';
import React, {FC, ReactNode} from 'react';
import FocusLock from 'react-focus-lock';

import {ModalKeyHandler} from '~core/keyboard';
import {noop} from '~utils/func';

import {OutsideClickDetector, Popup} from '../components';

type ModalContainerProps = {
    keyHandlers?: {[command: string]: () => void};
    onOutsideClick?: () => void;
    children: ReactNode;
    placement?: Placement;
}

const ModalContainer: FC<ModalContainerProps> = ({keyHandlers= {}, onOutsideClick = noop, placement, children}) => (
    <Popup placement={placement}>
        <OutsideClickDetector onOutsideClick={onOutsideClick}>
            <ModalKeyHandler handlers={keyHandlers}>
                <FocusLock returnFocus>
                    {children}
                </FocusLock>
            </ModalKeyHandler>
        </OutsideClickDetector>
    </Popup>
);

export default ModalContainer;
