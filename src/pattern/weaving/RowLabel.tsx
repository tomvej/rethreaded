import React, {FC} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {ActionIcon, ActionOverlay, CellLabel} from '~components';
import {noop} from '~utils/func';

import {addRowAfter, addRowBefore, removeRow} from '../actions';

type OwnProps = {
    row: number;
}

type DispatchProps = {
    addBefore: () => void;
    addAfter: () => void;
    remove: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch, {row}: OwnProps): DispatchProps => ({
    addAfter: () => dispatch(addRowAfter(row)),
    addBefore: () => dispatch(addRowBefore(row)),
    remove: () => dispatch(removeRow(row)),
});

const RowLabel: FC<OwnProps & DispatchProps> = ({row, addBefore, addAfter, remove}) => (
    <ActionOverlay
        top={<ActionIcon type="add" onClick={addAfter}/>}
        bottom={<ActionIcon type="add" onClick={addBefore}/>}
        left={<ActionIcon type="remove" onClick={remove}/>}
        fill
    >
        <CellLabel position="left">
            {row + 1}
        </CellLabel>
    </ActionOverlay>
);

export default connect(undefined, mapDispatchToProps)(RowLabel);
