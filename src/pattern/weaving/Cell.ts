import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {ThreadingCell} from '~components';
import {RootState} from '~reducer';

import {selectAndToggleDirection} from '../actions';
import {getThreading} from '../threading';
import {getDirection, getPatternColor} from './selectors';

type OwnProps = {
    tablet: number;
    row: number;
}

const mapStateToProps = (state: RootState, {tablet, row}: OwnProps) => ({
    threading: getThreading(state, tablet),
    direction: getDirection(state, row, tablet),
    color: getPatternColor(state, tablet, row),
});

const mapDispatchToProps = (dispatch: Dispatch, {tablet, row}: OwnProps) => ({
    focus: false,
    onClick: () => dispatch(selectAndToggleDirection(tablet, row)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ThreadingCell);
