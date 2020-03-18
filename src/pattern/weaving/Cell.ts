import {connect} from 'react-redux';

import {ThreadingCell} from '~components';
import {RootState} from '~reducer';
import {fromHex} from '~utils/color';

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

const mapDispatchToProps = () => ({
    focus: false,
    color: fromHex('#000000'),
    onClick: () => console.log('clicked'),
});

export default connect(mapStateToProps, mapDispatchToProps)(ThreadingCell);
