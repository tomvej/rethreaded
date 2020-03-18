import React from 'react';
import {connect} from 'react-redux';

import {RowLayout} from '~components';
import {RootState} from '~reducer';
import {seq} from '~utils/array';

import AddThread from './AddThread';
import RemoveOverlay from './RemoveOverlay';
import {getThreadNumber} from './selectors';
import Thread from './Thread';

const mapStateToProps = (state: RootState) => ({
    number: getThreadNumber(state),
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mergeProps = ({number}: StateProps) => ({
    children: seq(number).map((thread) => <RemoveOverlay key={thread} thread={thread}><Thread number={thread} /></RemoveOverlay>).concat([<AddThread key={number} />]),
});

export default connect(mapStateToProps, undefined, mergeProps)(RowLayout);
