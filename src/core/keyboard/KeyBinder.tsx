import React, {FC, ReactNode, useCallback, useEffect, useRef} from 'react';
import Mousetrap from 'mousetrap';
import shortcuts from '~shortcuts';
import {ListenerType} from './types';
import {KeyboardContextProvider} from './context';

type KeyBinderProps = {
    children: ReactNode;
}

const KeyBinder: FC<KeyBinderProps> = ({children}) => {
    const rootListener = useRef<ListenerType | null>(null);
    const register = useCallback((listener) => {
        rootListener.current = listener;
        return (): void => {
            rootListener.current = null;
        };
    }, []);

    useEffect(() => {
        const keyMap = Object.values(shortcuts)
            .reduce((acc: string[], keys) => acc.concat(Array.isArray(keys) ? keys : [keys]), []) // flatten
            .reduce((acc: {[key: string]: string[]}, key) => Object.assign({}, acc, {[key]: []}), {}); // to object
        Object.entries(shortcuts).forEach(([command, keys]) => {
            (Array.isArray(keys) ? keys : [keys]).forEach((key) => {
                keyMap[key].push(command);
            })
        });
        Object.entries(keyMap).forEach(([key, commands]) => {
            Mousetrap.bind(key, () => {
                if (rootListener.current) {
                    rootListener.current(commands, () => {/* do nothing */});
                } else {
                    throw new Error('No keyboard handler registered at root level!');
                }
            })
        });

        return (): void => {
            Object.keys(keyMap).forEach((key) => {
                Mousetrap.unbind(key);
            });
        };
    }, []);

    return (
        <KeyboardContextProvider value={register}>
            {children}
        </KeyboardContextProvider>
    )
};

export default KeyBinder;
