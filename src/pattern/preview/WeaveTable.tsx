import {connect} from 'react-redux';

import {WeaveTable} from '~components/weave';
import {RootState} from '~reducer';

import {getTabletNumber} from '../threading';
import {getRowNumber} from '../weaving';
import Weave from './Weave';

const mapStateToProps = (state: RootState) => ({
    rows: getRowNumber(state),
    tablets: getTabletNumber(state),
    weaveComponent: Weave, // reference always equal
    repeat: getRowNumber(state) > 20 ? 2 : 4,
});

export default connect(mapStateToProps)(WeaveTable);
