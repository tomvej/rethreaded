import React, {FC} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {ActionIcon, ActionOverlay, CellLabel} from '~components';

type OwnProps = {
    tablet: number;
}

type DispatchProps = {
    addBefore: () => void;
    addAfter: () => void;
    remove: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch, {tablet}: OwnProps): DispatchProps => ({
    addBefore: () => console.log('add before', tablet),
    addAfter: () => console.log('add after', tablet),
    remove: () => console.log('remove', tablet),
});

const TabletLabel: FC<DispatchProps & OwnProps> = ({tablet, addBefore, addAfter, remove}) => (
    <ActionOverlay
        fill
        top={<ActionIcon type="remove" onClick={remove} />}
        left={<ActionIcon type="add" onClick={addBefore} />}
        right={<ActionIcon type="add" onClick={addAfter} />}
    >
        <CellLabel>
        {tablet + 1}
        </CellLabel>
    </ActionOverlay>
);

export default connect(undefined, mapDispatchToProps)(TabletLabel);
