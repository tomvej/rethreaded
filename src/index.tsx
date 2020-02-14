import React, {FunctionComponent} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';

import {Thread} from './components';

const Component: FunctionComponent = () => (
    <Provider store={store}>
        <div>
            <Thread color="#ffccff" />
            <Thread color="#ab3400" />
        </div>
    </Provider>
);

render(
    <Component />,
    document.getElementById('root'),
);

