import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {Thread} from '~components';
import {RootState} from '~reducer';

import {isThreadSelected, selectThread} from '../selection';
import {showPicker} from './actions';
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
    select: () => dispatch(selectThread(number)),
    changeColor: () => dispatch(showPicker()),
});

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

const mergeProps = (
    {active, ...stateProps}: StateProps,
    {select, changeColor}: DispatchProps,
    {number}: OwnProps,
) => ({
    active,
    ...stateProps,
    onClick: active ? changeColor : select,
    label: String(number + 1),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Thread);
