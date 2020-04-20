import React, {FC} from 'react';
import {connect} from 'react-redux';

import {CellLabel} from '~components';
import {RootState} from '~reducer';
import {TabletId} from '../types';

import {createGetTabletTwist} from './selectors';

type OwnProps = {
    tablet: TabletId;
}

const createMapStateToProps = () => {
    const getTabletTwist = createGetTabletTwist();
    return (state: RootState, {tablet}: OwnProps) => {
        const twist = getTabletTwist(state, tablet);
        return ({
            children: twist,
        });
    };
};

type TabletInfoProps = ReturnType<ReturnType<typeof createMapStateToProps>>

const TabletInfo: FC<TabletInfoProps> = ({children}) => (
    <CellLabel position="top">
        {children}
    </CellLabel>
)

export default connect(createMapStateToProps)(TabletInfo);
