import React, {FC} from 'react';
import {connect} from 'react-redux';

import {ThreadingTable} from '~components';
import {RootState} from '~reducer';
import {Hole} from '~types';

import {HoleLabel} from '../components';
import Cell from './Cell';
import {getTablets} from './selectors';
import TabletLabel from './TabletLabel';
import ThreadingSwitch from './ThreadingSwitch';

const mapStateToProps = (state: RootState) => ({
    tablets: getTablets(state),
});

type StateProps = ReturnType<typeof mapStateToProps>;

const Cells: FC<StateProps> = ({tablets}) => (
    <ThreadingTable
        cellComponent={Cell}
        rows={[Hole.A, Hole.B, Hole.C, Hole.D]}
        tablets={tablets}
        leftMarginComponent={HoleLabel}
        topMarginComponent={TabletLabel}
        bottomMarginComponent={ThreadingSwitch}
    />
);

export default connect(mapStateToProps)(Cells);
