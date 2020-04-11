import {connect} from 'react-redux';

import {Weave} from '~components/weave';
import {RootState} from '~reducer';

import {getThreading} from '../threading';
import {getDirection, getPatternColor} from '../weaving';

type OwnProps = {
    row: number;
    tablet: number;
};

const mapStateToProps = (state: RootState, {tablet, row}: OwnProps) => ({
    color: getPatternColor(state, tablet, row),
    threading: getThreading(state, tablet),
    direction: getDirection(state, row, tablet),
    prevDirection: row > 0 ? getDirection(state, row - 1, tablet) : getDirection(state, row, tablet),
});

export default connect(mapStateToProps)(Weave);
