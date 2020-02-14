import React, {FunctionComponent} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';

import './style.scss';

import {Thread, ThreadingCell} from './components';
import {fromHex} from './utils/color';
import {Direction, ThreadingType} from './types';

const Component: FunctionComponent = () => (
    <Provider store={store}>
        <div>
            <Thread color={fromHex('#ffccff')} label="1" />
            <Thread color={fromHex('#ab3400')} label="2" />
            <ThreadingCell direction={Direction.Forward} threading={ThreadingType.S} color={fromHex('#4444FF')}/>
            <ThreadingCell direction={Direction.Backward} threading={ThreadingType.S} color={fromHex('#4444FF')}/>
            <ThreadingCell direction={Direction.Forward} threading={ThreadingType.Z} color={fromHex('#4444FF')}/>
            <ThreadingCell direction={Direction.Backward} threading={ThreadingType.Z} color={fromHex('#4444FF')}/>
        </div>
    </Provider>
);

render(
    <Component />,
    document.getElementById('root'),
);

