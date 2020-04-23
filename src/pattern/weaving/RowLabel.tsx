import React, {FC} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {ActionIcon, ActionOverlay, CellLabel} from '~components';
import {RootState} from '~reducer';

import {addRowAfter, addRowBefore, removeRow} from '../actions';
import {RowId} from '../types';
import {createGetRowOrder} from './selectors';


type OwnProps = {
    row: RowId;
}

const createMapStateToProps = () => {
    const getRowOrder = createGetRowOrder();
    return (state: RootState, {row}: OwnProps) => ({
        label: getRowOrder(state, row) + 1,
    });
};
type StateProps = ReturnType<ReturnType<typeof createMapStateToProps>>;

const mapDispatchToProps = (dispatch: Dispatch, {row}: OwnProps) => ({
    addAfter: () => dispatch(addRowAfter(row)),
    addBefore: () => dispatch(addRowBefore(row)),
    remove: () => dispatch(removeRow(row)),
});
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

const RowLabel: FC<StateProps & DispatchProps> = ({label, addBefore, addAfter, remove}) => (
    <ActionOverlay
        top={<ActionIcon type="add" onClick={addAfter}/>}
        bottom={<ActionIcon type="add" onClick={addBefore}/>}
        left={<ActionIcon type="remove" onClick={remove}/>}
        fill
    >
        <CellLabel position="left">
            {label}
        </CellLabel>
    </ActionOverlay>
);

export default connect(createMapStateToProps, mapDispatchToProps)(RowLabel);
