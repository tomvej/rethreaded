import React, {FC, ReactNode} from 'react';

import style from './RowLayout.scss';

type RowLayoutProps = {
    children: ReactNode;
}

const RowLayout: FC<RowLayoutProps> = ({children}) => (
    <div className={style.main}>
        {children}
    </div>
);

export default RowLayout;
