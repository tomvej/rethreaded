import React, {FC, ReactNode} from 'react';
import FocusLock from 'react-focus-lock';

import {ModalKeyHandler} from '~core/keyboard';
import {noop} from '~utils/func';

import {OutsideClickDetector} from '../components';

type ModalContainerProps = {
    keyHandlers?: {[command: string]: () => void};
    onOutsideClick?: () => void;
    children: ReactNode;
}

const ModalContainer: FC<ModalContainerProps> = ({keyHandlers= {}, onOutsideClick = noop, children}) => (
    <OutsideClickDetector onOutsideClick={onOutsideClick}>
        <ModalKeyHandler handlers={keyHandlers}>
            <FocusLock>
                {children}
            </FocusLock>
        </ModalKeyHandler>
    </OutsideClickDetector>
);

export default ModalContainer;
