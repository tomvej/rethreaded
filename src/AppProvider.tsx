import React, {FC} from 'react';
import {Provider} from 'react-redux';
import {KeyBinder} from '~core/keyboard';
import RootKeyHandler from './RootKeyHandler';
import store from './store';

const AppProvider: FC = ({children}) => (
    <Provider store={store}>
        <KeyBinder>
            <RootKeyHandler>
                {children}
            </RootKeyHandler>
        </KeyBinder>
    </Provider>
);

export default AppProvider;
