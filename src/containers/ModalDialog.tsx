import React, {FC, ReactNode} from 'react';
import FocusLock from 'react-focus-lock';

import {ModalDialog as ModalDialogComponent, OutsideClickDetector} from '~components';
import {ModalKeyHandler} from '~core/keyboard';
import {noop} from '~utils/func';

type ModalDialogProps = {
    children: ReactNode;
    onOutsideClick?: () => void;
    keyHandlers: {[command: string]: () => void};
}

const ModalDialog: FC<ModalDialogProps> = ({children, onOutsideClick= noop, keyHandlers}) => (
    <ModalDialogComponent>
        <OutsideClickDetector onOutsideClick={onOutsideClick}>
            <ModalKeyHandler handlers={keyHandlers}>
                <FocusLock returnFocus>
                    {children}
                </FocusLock>
            </ModalKeyHandler>
        </OutsideClickDetector>
    </ModalDialogComponent>
);

export default ModalDialog;
