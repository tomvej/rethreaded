import React, {FC} from 'react';
import {connect} from 'react-redux';

import {WeaveTable as WeaveTableComponent} from '~components/weave';
import {RootState} from '~reducer';
import {seq} from '~utils/array';

import {getTabletNumber} from '../threading';
import {getRowNumber} from '../weaving';
import Weave from './Weave';

const mapStateToProps = (state: RootState) => ({
    rows: getRowNumber(state),
    tablets: getTabletNumber(state),
});

type StateProps = ReturnType<typeof mapStateToProps>;

const WeaveTable: FC<StateProps> = ({rows, tablets}) => <WeaveTableComponent weaveComponent={Weave} tablets={seq(tablets)} rows={seq(rows)}/>;

export default connect(mapStateToProps)(WeaveTable);
