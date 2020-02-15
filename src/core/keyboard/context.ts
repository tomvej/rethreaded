import {createContext, useContext} from 'react';
import {assert} from '~utils/assert';
import {KeyboardContextType} from './types';

const KeyboardContext = createContext<KeyboardContextType | undefined>(undefined);

export const KeyboardContextProvider = KeyboardContext.Provider;

export const useKeyboardContext = (): KeyboardContextType => {
    const context = useContext(KeyboardContext);
    assert(context, 'Keyboard handler must be inside a keyboard binding provider.');
    return context;
};
