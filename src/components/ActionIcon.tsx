import {faPlus, faPlusCircle, faTimes, faTimesCircle, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon as FAIcon} from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import React, {FC} from 'react';

import style from './ActionIcon.scss';

type ActionType = 'add' | 'remove';

type ActionIconPropTypes = {
    type: ActionType;
    onClick: () => void;
};

const getIcons = (type: ActionType): [IconDefinition, IconDefinition] => {
    switch (type) {
        case 'add':
            return [faPlus, faPlusCircle];
        case 'remove':
            return [faTimes, faTimesCircle];
    }
};

const getClassname = (type: ActionType): string => {
    switch (type) {
        case 'add':
            return style.add;
        case 'remove':
            return style.remove;
    }
};

const ActionIcon: FC<ActionIconPropTypes> = ({type, onClick}) => (
    <div
        className={classnames('fa-layers', style.main, getClassname(type))}
        onClick={onClick}
    >
        <FAIcon icon={getIcons(type)[0]} inverse/>
        <FAIcon icon={getIcons(type)[1]}/>
    </div>
);

export default ActionIcon;
