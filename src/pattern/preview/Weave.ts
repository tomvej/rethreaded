import {connect} from 'react-redux';

import {Weave} from '~components/weave';
import {RootState} from '~reducer';

import {getThreading} from '../threading';
import {RowId, TabletId} from '../types';
import {getDirection, getPatternColor, getPreviousRow} from '../weaving';

type OwnProps = {
    row: RowId;
    tablet: TabletId;
};

const mapStateToProps = (state: RootState, {tablet, row}: OwnProps) => ({
    color: getPatternColor(state, tablet, row),
    threading: getThreading(state, tablet),
    direction: getDirection(state, row, tablet),
    prevDirection: getDirection(state, getPreviousRow(state, row), tablet),
});

export default connect(mapStateToProps)(Weave);
