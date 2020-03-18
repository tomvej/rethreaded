import React, {FC, ReactNode} from 'react';
import {connect} from 'react-redux';

import {ActionIcon, ActionOverlay} from '~components';

import {addThread} from '../actions';

const mapDispatchToProps = {
    onClick: addThread,
};

type AddThreadProPTypes = {
    onClick: () => void;
    children: ReactNode;
}

const AddOverlay: FC<AddThreadProPTypes> = ({onClick, children}) => (
    <ActionOverlay right={<ActionIcon type="add" onClick={onClick} />}>{children}</ActionOverlay>
);

export default connect(undefined, mapDispatchToProps)(AddOverlay);
