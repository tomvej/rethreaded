import React, {FC} from 'react';
import {connect} from 'react-redux';

import {ThreadingTable} from '~components';
import {RootState} from '~reducer';
import {Hole} from '~types';
import {seq} from '~utils/func';

import Cell from './Cell';
import {getTabletNumber} from './selectors';

const mapStateToProps = (state: RootState) => ({
    tablets: getTabletNumber(state),
});

type StateProps = ReturnType<typeof mapStateToProps>;

const Cells: FC<StateProps> = ({tablets}) => (
    <ThreadingTable
        cellComponent={Cell}
        rows={[Hole.A, Hole.B, Hole.C, Hole.D]}
        tablets={seq(tablets)}
    />
);

export default connect(mapStateToProps)(Cells);
