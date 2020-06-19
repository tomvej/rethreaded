import React, {FC, Fragment, ReactNode, useCallback, useEffect} from 'react';

import {assert} from '~utils/assert';

import {useModalKeyboardContext} from './modalContext';
import {SimpleListenerType} from './types';

type ModalKeyHandlerProps = {
    children: ReactNode;
    handlers: {[commands: string]: () => void};
};

const ModalKeyHandler: FC<ModalKeyHandlerProps> = ({children, handlers}) => {
    const registerListener = useModalKeyboardContext();

    const handleKeyPress = useCallback<SimpleListenerType>((event, commands) => {
        const applicableHandlers = Object.entries(handlers)
            .filter(([command]) => commands.includes(command))
            .map(([, handler]) => handler);
        assert(applicableHandlers.length <= 1, `There are too many active handlers for commands: ${commands.join(', ')}`);
        if (applicableHandlers.length === 1) {
            applicableHandlers[0]();
            event.preventDefault();
        }
    }, [handlers]);
    useEffect(() => registerListener(handleKeyPress), [handleKeyPress]);

    return (
        <Fragment>
            {children}
        </Fragment>
    )
};

export default ModalKeyHandler;
