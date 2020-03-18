import React, {FC} from 'react';
import {connect} from 'react-redux';

import {ActionIcon} from '~components';

import {addThread} from '../actions';

const mapDispatchToProps = {
    onClick: addThread,
};

type AddThreadProPTypes = {
    onClick: () => void;
}

const AddThread: FC<AddThreadProPTypes> = ({onClick}) => (<ActionIcon type="add" onClick={onClick} />);

export default connect(undefined, mapDispatchToProps)(AddThread);
