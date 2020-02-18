import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {ThreadingCell} from '~components';
import {RootState} from '~reducer';
import {Direction, Hole} from '~types';
import {selectAndApplyThread} from './actions';

import {getColor, getThreading, isFocused, isSelected} from './selectors';

type OwnProps = {
    tablet: number;
    hole: Hole;
}

const mapStateToProps = (state: RootState, {tablet, hole}: OwnProps) => ({
    threading: getThreading(state, tablet),
    color: getColor(state, tablet, hole),
    focus: isSelected(state, tablet, hole) && isFocused(state),
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch, {tablet, hole}: OwnProps) => ({
    onClick: () => dispatch(selectAndApplyThread(tablet, hole)),
});

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

const mergeProps = (stateProps: StateProps, dispatchProps: DispatchProps) => ({
    ...stateProps,
    ...dispatchProps,
    direction: Direction.Forward,
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ThreadingCell);
