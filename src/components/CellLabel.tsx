import React, {FC, ReactNode} from 'react';

import style from './CellLabel.scss';

type CellLabelPropTypes = {
    children: ReactNode;
}

const CellLabel: FC<CellLabelPropTypes> = ({children}) => (
    <div className={style.main}>
        {children}
    </div>
);

export default CellLabel;
