import React, {FC, ReactNode} from 'react';

import style from './ModalDialog.scss';

type ModalDialogProps = {
    children: ReactNode;
}

const ModalDialog: FC<ModalDialogProps> = ({children}) => (
    <div className={style.overlay}>
        <div className={style.main}>
            {children}
        </div>
    </div>
);

export default ModalDialog;
