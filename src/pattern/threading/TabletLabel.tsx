import React, {FC} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {ActionIcon, ActionOverlay, CellLabel} from '~components';
import {RootState} from '~reducer';

import {addTabletAfter, addTabletBefore, removeTablet} from '../actions';
import {TabletId} from '../types';
import {createGetTabletOrder} from './selectors';

type OwnProps = {
    tablet: TabletId;
}

const createMapStateToProps = () => {
    const getTabletOrder = createGetTabletOrder();
    return (state: RootState, {tablet}: OwnProps) => ({
        label: getTabletOrder(state, tablet) + 1,
    });
};
type StateProps = ReturnType<ReturnType<typeof createMapStateToProps>>;

const mapDispatchToProps = (dispatch: Dispatch, {tablet}: OwnProps) => ({
    addBefore: () => dispatch(addTabletBefore(tablet)),
    addAfter: () => dispatch(addTabletAfter(tablet)),
    remove: () => dispatch(removeTablet(tablet)),
});
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

const TabletLabel: FC<StateProps & DispatchProps> = ({label, addBefore, addAfter, remove}) => (
    <ActionOverlay
        fill
        top={<ActionIcon type="remove" onClick={remove} />}
        left={<ActionIcon type="add" onClick={addBefore} />}
        right={<ActionIcon type="add" onClick={addAfter} />}
    >
        <CellLabel position="top">
        {label}
        </CellLabel>
    </ActionOverlay>
);

export default connect(createMapStateToProps, mapDispatchToProps)(TabletLabel);
