import React from 'react';
import {connect} from 'react-redux';

import {RowLayout} from '~components';
import {RootState} from '~reducer';

import RemoveOverlay from './RemoveOverlay';
import {getThreads} from './selectors';
import Thread from './Thread';

const mapStateToProps = (state: RootState) => ({
    threads: getThreads(state),
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mergeProps = ({threads}: StateProps) => ({
    children: threads.map((thread, index) => (
        <RemoveOverlay key={thread} thread={thread}>
            <Thread thread={thread} number={index} />
        </RemoveOverlay>
    )),
});

export default connect(mapStateToProps, undefined, mergeProps)(RowLayout);
