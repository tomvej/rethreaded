import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {TabletLine} from '~components';
import {RootState} from '~reducer';
import {TabletId} from '../types';

import {toggleThreading} from './actions';
import {getThreading} from './selectors';

type OwnProps = {
    tablet: TabletId;
}

const mapStateToProps = (state: RootState, {tablet}: OwnProps) => ({
    threading:  getThreading(state, tablet),
});

const mapDispatchToProps = (dispatch: Dispatch, {tablet}: OwnProps) => ({
    onClick: () => dispatch(toggleThreading(tablet)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TabletLine);
