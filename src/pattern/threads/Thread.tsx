import React, {FC} from 'react';
import {Reference} from 'react-popper';
import {connect, ConnectedProps} from 'react-redux';
import {Dispatch} from 'redux';

import {Thread as ThreadComponent} from '~components';
import {RootState} from '~reducer';

import {isThreadSelected, selectThread} from '../selection';
import {ThreadId} from '../types';
import {showPicker} from './actions';
import {getColor, isFocused} from './selectors';

type OwnProps = {
    number: number;
    thread: ThreadId;
};

const mapStateToProps = (state: RootState, {thread}: OwnProps) => ({
    color: getColor(state, thread),
    active: isThreadSelected(state, thread),
    focus: isThreadSelected(state, thread) && isFocused(state),
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Dispatch, {number}: OwnProps) => ({
    select: () => dispatch(selectThread(number)),
    changeColor: () => dispatch(showPicker()),
});

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

const getLabel = (number: number): string => {
    if (number < 9) {
        return String(number + 1);
    } else if (number === 9) {
        return '0';
    } else {
        return '';
    }
};

const mergeProps = (
    {active, ...stateProps}: StateProps,
    {select, changeColor}: DispatchProps,
    {number}: OwnProps,
) => ({
    active,
    ...stateProps,
    onClick: active ? changeColor : select,
    label: getLabel(number),
});

const connector = connect(mapStateToProps, mapDispatchToProps, mergeProps);

const Thread: FC<ConnectedProps<typeof connector>> = (props) => {
    if (props.active) {
        return (
            <Reference>
                {({ref}) => <ThreadComponent ref={ref} {...props} />}
            </Reference>
        )
    } else {
        return <ThreadComponent {...props} />
    }
};

export default connector(Thread);
