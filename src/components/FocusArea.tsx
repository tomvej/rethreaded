import React, {FC, ReactNode} from 'react';

import style from './FocusArea.scss';

type FocusAreaProps = {
    onFocus: () => void;
    onBlur: () => void;
    children: ReactNode;
};

const FocusArea: FC<FocusAreaProps> = ({onFocus, onBlur, children}) => (
    <div
        tabIndex={0}
        onFocus={onFocus}
        onBlur={onBlur}
        className={style.main}
    >
        {children}
    </div>
);

export default FocusArea;
