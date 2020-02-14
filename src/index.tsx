import React, {FunctionComponent} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';

import './style.scss';

import {Thread, ThreadingCell, FocusArea} from './components';
import {fromHex} from './utils/color';
import {Direction, ThreadingType} from './types';

const noop = (): void => {/* do nothing */};

const Component: FunctionComponent = () => (
    <Provider store={store}>
        <div>
            <FocusArea onFocus={noop} onBlur={noop}>
                <Thread color={fromHex('#ffccff')} label="1"/>
                <Thread color={fromHex('#ab3400')} label="2"/>
            </FocusArea>
            <FocusArea onFocus={noop} onBlur={noop}>
                <ThreadingCell direction={Direction.Forward} threading={ThreadingType.S} color={fromHex('#4444FF')}/>
                <ThreadingCell direction={Direction.Backward} threading={ThreadingType.S} color={fromHex('#4444FF')}/>
                <ThreadingCell direction={Direction.Forward} threading={ThreadingType.Z} color={fromHex('#4444FF')}/>
                <ThreadingCell direction={Direction.Backward} threading={ThreadingType.Z} color={fromHex('#4444FF')}/>
            </FocusArea>
        </div>
    </Provider>
);

render(
    <Component />,
    document.getElementById('root'),
);

