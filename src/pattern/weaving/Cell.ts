import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {ThreadingCell} from '~components';
import {RootState} from '~reducer';
import {fromHex} from '~utils/color';

import {selectAndToggleDirection} from '../actions';
import {getThreading} from '../threading';
import {getDirection} from './selectors';

type OwnProps = {
    tablet: number;
    row: number;
}

const mapStateToProps = (state: RootState, {tablet, row}: OwnProps) => ({
    threading: getThreading(state, tablet),
    direction: getDirection(state, row, tablet),
});

const mapDispatchToProps = (dispatch: Dispatch, {tablet, row}: OwnProps) => ({
    focus: false,
    color: fromHex('#000000'),
    onClick: () => dispatch(selectAndToggleDirection(tablet, row)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ThreadingCell);
