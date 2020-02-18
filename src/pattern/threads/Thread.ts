import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {Thread} from '~components';
import {RootState} from '~reducer';

import {select} from './actions';
import {getColor, isFocused, isSelected} from './selectors';

type OwnProps = {
    number: number;
};

const mapStateToProps = (state: RootState, {number}: OwnProps) => ({
    color: getColor(state, number),
    active: isSelected(state, number),
    focus: isSelected(state, number) && isFocused(state),
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch, {number}: OwnProps) => ({
    onClick: () => dispatch(select(number)),
});

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

const mergeProps = (stateProps: StateProps, dispatchProps: DispatchProps, {number}: OwnProps) => ({
    ...stateProps,
    ...dispatchProps,
    label: String(number + 1),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Thread);
