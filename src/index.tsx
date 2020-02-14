import React, {FunctionComponent} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';

import './style.scss';

import {Thread} from './components';
import {fromHex} from './utils/color';

const Component: FunctionComponent = () => (
    <Provider store={store}>
        <div>
            <Thread color={fromHex('#ffccff')} label="1" />
            <Thread color={fromHex('#ab3400')} label="2" />
        </div>
    </Provider>
);

render(
    <Component />,
    document.getElementById('root'),
);

