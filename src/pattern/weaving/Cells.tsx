import React, {FC} from 'react';
import {connect} from 'react-redux';

import {ThreadingTable} from '~components';
import {RootState} from '~reducer';
import {seq} from '~utils/array';

import Cell from './Cell';
import RowLabel from './RowLabel';
import {getRowNumber, getTabletNumber} from './selectors';
import TabletInfo from './TabletInfo';

const mapStateToProps = (state: RootState) => ({
    rows: getRowNumber(state),
    tablets: getTabletNumber(state),
});

type StateProps = ReturnType<typeof mapStateToProps>

const Cells: FC<StateProps> = ({rows, tablets}) => (
    <ThreadingTable
        cellComponent={Cell}
        rows={seq(rows)}
        tablets={seq(tablets)}
        leftMarginComponent={RowLabel}
        bottomMarginComponent={({tablet}) => <div>{tablet + 1}</div>}
        topMarginComponent={TabletInfo}
    />
);

export default connect(mapStateToProps)(Cells);
