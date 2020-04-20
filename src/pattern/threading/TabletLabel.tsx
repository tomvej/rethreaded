import React, {FC} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {ActionIcon, ActionOverlay, CellLabel} from '~components';

import {addTabletAfter, addTabletBefore, removeTablet} from '../actions';
import {TabletId} from '../types';

type OwnProps = {
    tablet: TabletId;
}

type DispatchProps = {
    addBefore: () => void;
    addAfter: () => void;
    remove: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch, {tablet}: OwnProps): DispatchProps => ({
    addBefore: () => dispatch(addTabletBefore(tablet)),
    addAfter: () => dispatch(addTabletAfter(tablet)),
    remove: () => dispatch(removeTablet(tablet)),
});

const TabletLabel: FC<DispatchProps & OwnProps> = ({tablet, addBefore, addAfter, remove}) => (
    <ActionOverlay
        fill
        top={<ActionIcon type="remove" onClick={remove} />}
        left={<ActionIcon type="add" onClick={addBefore} />}
        right={<ActionIcon type="add" onClick={addAfter} />}
    >
        <CellLabel position="top">
        {tablet + 1}
        </CellLabel>
    </ActionOverlay>
);

export default connect(undefined, mapDispatchToProps)(TabletLabel);
