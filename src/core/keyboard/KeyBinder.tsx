import React, {FC, ReactNode, useCallback, useEffect, useRef} from 'react';
import Mousetrap from 'mousetrap';
import shortcuts from '~shortcuts';
import {ListenerType} from './types';
import {KeyboardContextProvider} from './context';
import {assert} from '~utils/assert';
import {noop} from '~utils/func';

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
                assert(rootListener.current, 'No keyboard handler registered at root level!');
                rootListener.current(commands, noop);
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
