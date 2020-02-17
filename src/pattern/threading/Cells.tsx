import React, {Fragment} from 'react';
import {connect} from 'react-redux';

import {RootState} from '~reducer';
import {Hole} from '~types';
import {seq} from '~utils/func';

import Cell from './Cell';
import {getTabletNumber} from './selectors';

const mapStateToProps = (state: RootState) => ({
    tablets: getTabletNumber(state),
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mergeProps = ({tablets}: StateProps) => ({
    children: seq(tablets).map((tablet) => (
        <Fragment key={tablet}>
            <Cell tablet={tablet} hole={Hole.A} />
            <Cell tablet={tablet} hole={Hole.B} />
            <Cell tablet={tablet} hole={Hole.C} />
            <Cell tablet={tablet} hole={Hole.D} />
        </Fragment>
    ))
});

export default connect(mapStateToProps, undefined, mergeProps)(Fragment);
