import React, {FC} from 'react';
import {connect} from 'react-redux';

import {ThreadingTable} from '~components';
import {RootState} from '~reducer';

import {getTablets} from '../threading';
import Cell from './Cell';
import RowLabel from './RowLabel';
import {getRows} from './selectors';
import TabletInfo from './TabletInfo';
import TabletLabel from './TabletLabel';

const mapStateToProps = (state: RootState) => ({
    rows: getRows(state),
    tablets: getTablets(state),
});

type StateProps = ReturnType<typeof mapStateToProps>

const Cells: FC<StateProps> = ({rows, tablets}) => (
    <ThreadingTable
        cellComponent={Cell}
        rows={rows}
        tablets={tablets}
        leftMarginComponent={RowLabel}
        bottomMarginComponent={TabletLabel}
        topMarginComponent={TabletInfo}
    />
);

export default connect(mapStateToProps)(Cells);
