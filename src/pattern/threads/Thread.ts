import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {Thread} from '~components';
import {RootState} from '~reducer';

import {isThreadSelected, selectThread} from '../selection';
import {getColor, isFocused} from './selectors';

type OwnProps = {
    number: number;
};

const mapStateToProps = (state: RootState, {number}: OwnProps) => ({
    color: getColor(state, number),
    active: isThreadSelected(state, number),
    focus: isThreadSelected(state, number) && isFocused(state),
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch, {number}: OwnProps) => ({
    onClick: () => dispatch(selectThread(number)),
});

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

const mergeProps = (stateProps: StateProps, dispatchProps: DispatchProps, {number}: OwnProps) => ({
    ...stateProps,
    ...dispatchProps,
    label: String(number + 1),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Thread);
