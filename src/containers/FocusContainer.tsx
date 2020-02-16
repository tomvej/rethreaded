import React, {FC, ReactNode} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {FocusArea} from '~components';
import {focusGained, focusLost, isFocused} from '~core/focus';
import {KeyHandler} from '~core/keyboard';
import {RootState} from '~reducer';
import {REDO, UNDO} from '~shortcuts';

type OwnProps = {
    id: string;
};

const mapStateToProps = (state: RootState, {id}: OwnProps) => ({
    focus: isFocused(state, id),
});

const mapDispatchToProps = (dispatch: Dispatch, {id}: OwnProps) => ({
    onFocus: () => dispatch(focusGained(id)),
    onBlur: () => dispatch(focusLost(id)),
});

type KeyboardFocusAreaProps = {
    focus: boolean;
    id: string;
    onFocus: () => void;
    onBlur: () => void;
    children: ReactNode;
}

const KeyboardFocusArea: FC<KeyboardFocusAreaProps> = ({focus, id, onFocus, onBlur, children}) => (
    <KeyHandler
        focus={focus}
        handlers={{
            [UNDO]: (): void => console.log(`undo ${id}`),
            [REDO]: (): void => console.log(`redo ${id}`),
        }}
    >
        <FocusArea onFocus={onFocus} onBlur={onBlur}>
            {children}
        </FocusArea>
    </KeyHandler>
);

const FocusContainer = connect(mapStateToProps, mapDispatchToProps)(KeyboardFocusArea);

export default FocusContainer;
