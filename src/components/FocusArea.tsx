import React, {FunctionComponent} from 'react';

import style from './FocusArea.scss';

type FocusAreaPropTypes = {
    onFocus: () => void;
    onBlur: () => void;
};

const FocusArea: FunctionComponent<FocusAreaPropTypes> = ({onFocus, onBlur, children}) => (
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
