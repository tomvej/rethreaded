import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon as FAIcon} from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import React, {FC} from 'react';

import style from './ToolbarButton.scss';

type ToolbarButtonProps = {
    onClick: () => void;
    disabled?: boolean;
    icon: IconProp;
    title: string;
    active?: boolean;
};

const ToolbarButton: FC<ToolbarButtonProps> = ({onClick, icon, title, disabled = false, active = false}) => (
    <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={classnames(style.main, {[style.active]: active})}
        title={title}
    >
        <FAIcon icon={icon} />
    </button>
);

export default ToolbarButton;
