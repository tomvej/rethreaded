import React, {FC} from 'react';
import {connect} from 'react-redux';

import {ThreadingTable} from '~components';
import {RootState} from '~reducer';
import {Hole} from '~types';
import {seq} from '~utils/func';

import {HoleLabel} from '../components';
import Cell from './Cell';
import {getTabletNumber} from './selectors';
import ThreadingSwitch from './ThreadingSwitch';

const mapStateToProps = (state: RootState) => ({
    tablets: getTabletNumber(state),
});

type StateProps = ReturnType<typeof mapStateToProps>;

const Cells: FC<StateProps> = ({tablets}) => (
    <ThreadingTable
        cellComponent={Cell}
        rows={[Hole.A, Hole.B, Hole.C, Hole.D]}
        tablets={seq(tablets)}
        leftMarginComponent={HoleLabel}
        topMarginComponent={({tablet}) => <div>{String(tablet)}</div>}
        bottomMarginComponent={ThreadingSwitch}
    />
);

export default connect(mapStateToProps)(Cells);
