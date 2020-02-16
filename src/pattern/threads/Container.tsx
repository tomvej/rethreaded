import React, {FC, Fragment} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '~reducer';
import {seq} from '~utils/func';
import {getThreadNumber} from './selectors';
import Thread from './Thread';

const mapStateToProps = (state: RootState) => ({
    number: getThreadNumber(state),
});

const connector = connect(mapStateToProps);

type ContainerProps = ConnectedProps<typeof connector>;

const Container: FC<ContainerProps> = ({number}) => (
    <Fragment>
        {seq(number).map((i) => <Thread key={i} number={i} />)}
    </Fragment>
);

export default connector(Container);
