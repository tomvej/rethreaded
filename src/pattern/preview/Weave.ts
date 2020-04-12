import {connect} from 'react-redux';

import {Weave} from '~components/weave';
import {RootState} from '~reducer';
import {decrement} from '~utils/func';

import {getThreading} from '../threading';
import {getDirection, getPatternColor, getRowNumber} from '../weaving';

type OwnProps = {
    row: number;
    tablet: number;
};

const mapStateToProps = (state: RootState, {tablet, row}: OwnProps) => ({
    color: getPatternColor(state, tablet, row),
    threading: getThreading(state, tablet),
    direction: getDirection(state, row, tablet),
    prevDirection: getDirection(state, decrement(getRowNumber(state))(row), tablet),
});

export default connect(mapStateToProps)(Weave);
