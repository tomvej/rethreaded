import * as React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';

const Component = () => (
    <Provider store={store}>
        <div>It works!</div>
    </Provider>
);

render(
    <Component />,
    document.getElementById('root'),
);

