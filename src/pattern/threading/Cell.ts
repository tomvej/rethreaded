import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {ThreadingCell} from '~components';
import {RootState} from '~reducer';
import {Direction, Hole} from '~types';

import {selectAndApplyThread} from '../actions';
import {isThreadingSelected} from '../selection';
import {TabletId} from '../types';
import {getColor, getThreading, isFocused} from './selectors';

type OwnProps = {
    tablet: TabletId;
    row: Hole;
}

const mapStateToProps = (state: RootState, {tablet, row: hole}: OwnProps) => ({
    threading: getThreading(state, tablet),
    color: getColor(state, tablet, hole),
    focus: isThreadingSelected(state, tablet, hole) && isFocused(state),
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch, {tablet, row: hole}: OwnProps) => ({
    onClick: () => dispatch(selectAndApplyThread(tablet, hole)),
});

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

const mergeProps = (stateProps: StateProps, dispatchProps: DispatchProps) => ({
    ...stateProps,
    ...dispatchProps,
    direction: Direction.Forward,
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ThreadingCell);
