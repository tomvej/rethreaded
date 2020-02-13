import * as React from 'react';
import {render} from 'react-dom';

const Component = () => (
    <div>It works!</div>
);

render(
    <Component />,
    document.getElementById('root'),
);

