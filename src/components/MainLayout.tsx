import React, {FC, ReactNode} from 'react';

import style from './MainLayout.scss';

type MainLayoutProps = {
    toolbar: ReactNode;
    children: ReactNode;
    info: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({toolbar, info, children}) => (
    <div className={style.main}>
        <div>{info}</div>
        <div>{children}</div>
        <div>{toolbar}</div>
    </div>
);

export default MainLayout;
