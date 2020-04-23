import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {ThreadingCell} from '~components';
import {RootState} from '~reducer';

import {selectAndToggleDirection} from '../actions';
import {getThreading} from '../threading';
import {RowId, TabletId} from '../types';
import {getDirection, getPatternColor, isFocused, isWeavingSelected} from './selectors';

type OwnProps = {
    tablet: TabletId;
    row: RowId;
}

const mapStateToProps = (state: RootState, {tablet, row}: OwnProps) => ({
    threading: getThreading(state, tablet),
    direction: getDirection(state, row, tablet),
    color: getPatternColor(state, tablet, row),
    focus: isFocused(state) && isWeavingSelected(state, tablet, row),
});

const mapDispatchToProps = (dispatch: Dispatch, {tablet, row}: OwnProps) => ({
    onClick: () => dispatch(selectAndToggleDirection(tablet, row)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ThreadingCell);
