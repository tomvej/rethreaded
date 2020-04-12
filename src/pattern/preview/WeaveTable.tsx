import {connect} from 'react-redux';

import {WeaveTable} from '~components/weave';
import {RootState} from '~reducer';

import {getTabletNumber} from '../threading';
import {getRowNumber} from '../weaving';
import {getNumberOfRepeats} from './selectors';
import Weave from './Weave';

const mapStateToProps = (state: RootState) => ({
    rows: getRowNumber(state),
    tablets: getTabletNumber(state),
    weaveComponent: Weave, // reference always equal
    repeat: getNumberOfRepeats(state),
});

export default connect(mapStateToProps)(WeaveTable);
