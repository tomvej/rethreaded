import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon as FAIcon} from '@fortawesome/react-fontawesome';
import React, {FC} from 'react';

import style from './ToolbarButton.scss';

type ToolbarButtonProps = {
    onClick: () => void;
    disabled?: boolean;
    icon: IconProp;
    title: string;
};

const ToolbarButton: FC<ToolbarButtonProps> = ({onClick, icon, title, disabled = false}) => (
    <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={style.main}
        title={title}
    >
        <FAIcon icon={icon} />
    </button>
);

export default ToolbarButton;
