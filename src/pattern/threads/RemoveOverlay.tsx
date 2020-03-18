import React, {FC, ReactNode} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {ActionIcon, ActionOverlay} from '~components';

import {removeThread} from '../actions';


type OwnProps = {
    thread: number;
}

type DispatchProps = {
    remove: () => void;
    children: ReactNode;
}

const mapDispatchToProps = (dispatch: Dispatch, {thread}: OwnProps) => ({
    remove: () => dispatch(removeThread()),
});

const RemoveOverlay: FC<DispatchProps> = ({remove, children}) => (
    <ActionOverlay
        topRight={<ActionIcon type="remove" onClick={remove}/>}
    >
        {children}
    </ActionOverlay>
);

export default connect(undefined, mapDispatchToProps)(RemoveOverlay);
