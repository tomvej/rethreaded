import React, {FC} from 'react';
import {Reference} from 'react-popper';
import {connect, ConnectedProps} from 'react-redux';
import {Dispatch} from 'redux';

import {Thread as ThreadComponent} from '~components';
import {RootState} from '~reducer';

import {selectThread} from '../selection';
import {ThreadId} from '../types';
import {showPicker} from './actions';
import {createGetThreadOrder, getColor, isFocused, isThreadSelected} from './selectors';

type OwnProps = {
    thread: ThreadId;
};

const createMapStateToProps = () => {
    const getThreadOrder = createGetThreadOrder();
    return (state: RootState, {thread}: OwnProps) => ({
        color: getColor(state, thread),
        active: isThreadSelected(state, thread),
        focus: isThreadSelected(state, thread) && isFocused(state),
        number: getThreadOrder(state, thread),
    });
}

type StateProps = ReturnType<ReturnType<typeof createMapStateToProps>>;

const mapDispatchToProps = {
    select: selectThread,
    changeColor: showPicker,
};

type DispatchProps = typeof mapDispatchToProps;

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
    {active, number, ...stateProps}: StateProps,
    {select, changeColor}: DispatchProps,
) => ({
    active,
    ...stateProps,
    onClick: active ? changeColor : () => select(number),
    label: getLabel(number),
});

const connector = connect(createMapStateToProps, mapDispatchToProps, mergeProps);

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
