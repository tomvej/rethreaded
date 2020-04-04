import Mousetrap from 'mousetrap';
import React, {FC, ReactNode, useCallback, useEffect, useRef} from 'react';

import shortcuts from '~shortcuts';
import {assert} from '~utils/assert';
import {noop} from '~utils/func';

import {KeyboardContextProvider} from './context';
import {ModalKeyboardContextProvider} from './modalContext';
import {ListenerType, SimpleListenerType} from './types';

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
    const modalListener = useRef<SimpleListenerType | null>(null);
    const registerModal = useCallback((listener) => {
        assert(modalListener.current === null, 'Too many registered modal listeners');
        modalListener.current = listener;
        return (): void => {
            modalListener.current = null;
        }
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
            Mousetrap.bind(key, (event) => {
                if (modalListener.current) {
                    modalListener.current(event, commands);
                } else {
                    assert(rootListener.current, 'No keyboard handler registered at root level!');
                    rootListener.current(event, commands, noop);
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
            <ModalKeyboardContextProvider value={registerModal}>
                {children}
            </ModalKeyboardContextProvider>
        </KeyboardContextProvider>
    )
};

export default KeyBinder;
