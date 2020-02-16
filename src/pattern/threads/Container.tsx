import React, {FC, Fragment} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '~reducer';
import {getThreadNumber} from './selectors';
import {seq} from '~utils/func';

const mapStateToProps = (state: RootState) => ({
    number: getThreadNumber(state),
});

const connector = connect(mapStateToProps);

type ContainerProps = ConnectedProps<typeof connector>;

const Container: FC<ContainerProps> = ({number}) => (
    <Fragment>
        {seq(number).map((i) => <div key={i}>{i}</div>)}
    </Fragment>
);

export default connector(Container);
