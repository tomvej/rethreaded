import React, {FC, ReactNode} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {FocusArea} from '~components';
import {focusGained, focusLost, isFocused} from '~core/focus';
import {KeyHandler} from '~core/keyboard';
import {RootState} from '~reducer';

type HandlersType = {[command: string]: () => void};

type OwnProps = {
    id: string;
    keyHandlers?: HandlersType;
};

const mapStateToProps = (state: RootState, {id}: OwnProps) => ({
    focus: isFocused(state, id),
});

const mapDispatchToProps = (dispatch: Dispatch, {id, keyHandlers= {}}: OwnProps) => ({
    onFocus: () => dispatch(focusGained(id)),
    onBlur: () => dispatch(focusLost(id)),
    handlers: bindActionCreators(keyHandlers, dispatch),
});

type KeyboardFocusAreaProps = {
    focus: boolean;
    onFocus: () => void;
    onBlur: () => void;
    handlers: HandlersType;
    children: ReactNode;
}

const KeyboardFocusArea: FC<KeyboardFocusAreaProps> = ({focus, onFocus, onBlur, handlers, children}) => (
    <KeyHandler
        focus={focus}
        handlers={handlers}
    >
        <FocusArea onFocus={onFocus} onBlur={onBlur}>
            {children}
        </FocusArea>
    </KeyHandler>
);

const FocusContainer = connect(mapStateToProps, mapDispatchToProps)(KeyboardFocusArea);

export default FocusContainer;
