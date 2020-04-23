import React, {FC} from 'react';
import {connect} from 'react-redux';

import {CellLabel} from '~components';
import {RootState} from '~reducer';

import {createGetTabletOrder} from '../threading';
import {TabletId} from '../types';

type OwnProps = {
    tablet: TabletId;
}

const createMapStateToProps = () => {
    const getTabletOrder = createGetTabletOrder();
    return (state: RootState, {tablet}: OwnProps) => ({
        label: getTabletOrder(state, tablet) + 1,
    });
}
type StateProps = ReturnType<ReturnType<typeof createMapStateToProps>>;

const TabletLabel: FC<StateProps> = ({label}) => (
    <CellLabel position="bottom">
        {label}
    </CellLabel>
);

export default connect(createMapStateToProps)(TabletLabel);
