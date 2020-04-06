import React, {FC, ReactNode} from 'react';

import style from './ToolbarButton.scss';

type ToolbarButtonProps = {
    children: ReactNode;
    onClick: () => void;
    disabled?: boolean;
};

const ToolbarButton: FC<ToolbarButtonProps> = ({onClick, children, disabled = false}) => (
    <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={style.main}
    >
        {children}
    </button>
);

export default ToolbarButton;
