import React, {FC} from 'react';
import {Provider} from 'react-redux';
import {KeyBinder, KeyHandler} from '~core/keyboard';
import store from './store';
import {REDO, UNDO} from '~shortcuts';

const AppProvider: FC = ({children}) => (
    <Provider store={store}>
        <KeyBinder>
            <KeyHandler
                focus
                handlers={{
                    [UNDO]: (): void => console.log('undo'),
                    [REDO]: (): void => console.log('redo'),
                }}
            >
                {children}
            </KeyHandler>
        </KeyBinder>
    </Provider>
);

export default AppProvider;
