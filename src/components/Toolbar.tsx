import React, {FC, ReactNode} from 'react';

import style from './Toolbar.scss';

type ToolbarProps = {
    children: ReactNode;
}

const Toolbar: FC<ToolbarProps> = ({children}) => (
    <div className={style.main}>
        {children}
    </div>
);

export default Toolbar;

