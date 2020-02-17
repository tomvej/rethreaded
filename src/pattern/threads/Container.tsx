import React, {FC} from 'react';
import {connect, ConnectedProps} from 'react-redux';

import {FocusContainer} from '~containers';
import {RootState} from '~reducer';
import {MOVE_LEFT, MOVE_RIGHT} from '~shortcuts';
import {seq} from '~utils/func';

import {selectNext, selectPrevious} from './actions';
import {NAME} from './constants';
import {getThreadNumber} from './selectors';
import Thread from './Thread';

const mapStateToProps = (state: RootState) => ({
    number: getThreadNumber(state),
});

const connector = connect(mapStateToProps);

type ContainerProps = ConnectedProps<typeof connector>;

const bindHandlers = {
    [MOVE_LEFT]: selectPrevious,
    [MOVE_RIGHT]: selectNext,
};

const Container: FC<ContainerProps> = ({number}) => (
    <FocusContainer id={NAME} keyHandlers={bindHandlers}>
        {seq(number).map((i) => <Thread key={i} number={i} />)}
    </FocusContainer>
);

export default connector(Container);
