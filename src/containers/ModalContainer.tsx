import React, {FC, ReactNode} from 'react';
import FocusLock from 'react-focus-lock';

import {ModalKeyHandler} from '~core/keyboard';

type ModalContainerProps = {
    keyHandlers?: {[command: string]: () => void};
    children: ReactNode;
}

const ModalContainer: FC<ModalContainerProps> = ({keyHandlers= {}, children}) => (
    <ModalKeyHandler handlers={keyHandlers}>
        <FocusLock>
            {children}
        </FocusLock>
    </ModalKeyHandler>
);

export default ModalContainer;
