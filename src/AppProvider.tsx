import React, {FC} from 'react';
import {Provider} from 'react-redux';
import {KeyboardBinder, KeyboardHandler} from '~core/keyboard';
import store from './store';
import {REDO, UNDO} from '~shortcuts';

const AppProvider: FC = ({children}) => (
    <Provider store={store}>
        <KeyboardBinder>
            <KeyboardHandler
                focus
                handlers={{
                    [UNDO]: (): void => console.log('undo'),
                    [REDO]: (): void => console.log('redo'),
                }}
            >
                {children}
            </KeyboardHandler>
        </KeyboardBinder>
    </Provider>
);

export default AppProvider;
