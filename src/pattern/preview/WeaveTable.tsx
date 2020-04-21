import React, {FC} from 'react';
import {connect} from 'react-redux';

import {WeaveTable as WeaveTableComponent} from '~components/weave';
import {RootState} from '~reducer';

import {getTablets} from '../threading';
import {getRowNumber} from '../weaving';
import {getNumberOfRepeats} from './selectors';
import Weave from './Weave';

const mapStateToProps = (state: RootState) => ({
    rows: getRowNumber(state),
    tablets: getTablets(state),
    repeat: getNumberOfRepeats(state),
});

type WeaveTableProps = ReturnType<typeof mapStateToProps>;

const WeaveTable: FC<WeaveTableProps> = ({rows, tablets, repeat}) => (
    <WeaveTableComponent
        rows={rows}
        tablets={tablets}
        repeat={repeat}
        weaveComponent={Weave}
    />
)

export default connect(mapStateToProps)(WeaveTable);
