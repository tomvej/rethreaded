import {createContext, useContext} from 'react';

import {assert} from '~utils/assert';

import {ModalKeyboardContextType} from './types';

const ModalKeyboardContext = createContext<ModalKeyboardContextType | undefined>(undefined);

export const ModalKeyboardContextProvider = ModalKeyboardContext.Provider;

export const useModalKeyboardContext = (): ModalKeyboardContextType => {
    const context = useContext(ModalKeyboardContext);
    assert(context, 'Keyboard handler must be inside a keyboard binding provider.');
    return context;
};
