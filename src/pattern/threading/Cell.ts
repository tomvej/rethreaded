import {connect} from 'react-redux';

import {ThreadingCell} from '~components';
import {RootState} from '~reducer';
import {Direction, Hole} from '~types';

import {getColor, getThreading} from './selectors';

type OwnProps = {
    tablet: number;
    hole: Hole;
}

const mapStateToProps = (state: RootState, {tablet, hole}: OwnProps) => ({
    threading: getThreading(state, tablet),
    color: getColor(state, tablet, hole),
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mergeProps = (stateProps: StateProps) => ({
    ...stateProps,
    direction: Direction.Forward,
});

export default connect(mapStateToProps, undefined, mergeProps)(ThreadingCell);
