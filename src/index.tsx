import React, {FunctionComponent} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';

import {Thread} from './components';
import {fromHex} from './utils/color';

const Component: FunctionComponent = () => (
    <Provider store={store}>
        <div>
            <Thread color={fromHex('#ffccff')} />
            <Thread color={fromHex('#ab3400')} />
        </div>
    </Provider>
);

render(
    <Component />,
    document.getElementById('root'),
);

