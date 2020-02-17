import './style.scss';

import React, {FunctionComponent} from 'react';
import {render} from 'react-dom';

import AppProvider from './AppProvider';
import {Container as Pattern} from './pattern';

const Component: FunctionComponent = () => (
    <AppProvider>
        <Pattern />
    </AppProvider>
);

render(
    <Component />,
    document.getElementById('root'),
);

