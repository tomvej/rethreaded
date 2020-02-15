import {createContext, useContext} from 'react';
import {KeyboardContextType} from './types';

const KeyboardContext = createContext<KeyboardContextType | undefined>(undefined);

export const KeyboardContextProvider = KeyboardContext.Provider;

export const useKeyboardContext = (): KeyboardContextType => {
    const context = useContext(KeyboardContext);
    if (context) {
        return context;
    } else {
        throw new Error('Keyboard handler must be inside a keyboard binding provider.');
    }
};
