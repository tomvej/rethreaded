import React, {FC, ReactNode, useCallback,useEffect, useRef} from 'react';

import {KeyboardContextProvider, useKeyboardContext} from './context';
import {ListenerType} from './types';

type KeyHandlerProps = {
    focus: boolean;
    children: ReactNode;
    handlers: {[command: string]: () => void};
}

const KeyHandler: FC<KeyHandlerProps> = ({focus, handlers, children}) => {
    const registerAtParent = useKeyboardContext();
    const listeners = useRef<Array<ListenerType>>([]);

    const handleKeyPress = useCallback<ListenerType>((event, commands, callback) => {
        const currentCallback = (): void => {
            const applicableHandlers = Object
                .entries(handlers)
                .filter(([command]) => commands.includes(command))
                .map(([,handler]) => handler);
            if (applicableHandlers.length === 0) {
                callback();
            } else if (applicableHandlers.length === 1) {
                applicableHandlers[0]();
            } else {
                throw new Error(`There are too many active handlers for commands: ${commands.join(', ')}`);
            }
        };

        if (listeners.current.length === 0) {
            currentCallback();
            event.preventDefault();
        } else if (listeners.current.length === 1) {
            listeners.current[0](event, commands, currentCallback);
        } else {
            throw new Error('Two siblings have focus at the same time.');
        }
    }, [handlers]);

    useEffect(() => {
        if (focus) {
            return registerAtParent(handleKeyPress);
        }
    }, [focus, handleKeyPress]);

    const register = useCallback((listener: ListenerType) => {
        listeners.current.push(listener);
        return (): void => {
            listeners.current.splice(listeners.current.indexOf(listener), 1);
        };
    }, []);

    return (
        <KeyboardContextProvider value={register}>
            {children}
        </KeyboardContextProvider>
    );
};

export default KeyHandler;
