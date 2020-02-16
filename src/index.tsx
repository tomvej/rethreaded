import './style.scss';

import React, {FunctionComponent} from 'react';
import {render} from 'react-dom';

import {ThreadingCell} from '~components';
import {FocusContainer} from '~containers';
import {Direction, ThreadingType} from '~types';
import {fromHex} from '~utils/color';

import AppProvider from './AppProvider';
import {Container as Pattern} from './pattern';

const Component: FunctionComponent = () => (
    <AppProvider>
        <div>
            <FocusContainer id="threading">
                <ThreadingCell direction={Direction.Forward} threading={ThreadingType.S} color={fromHex('#4444FF')}/>
                <ThreadingCell direction={Direction.Backward} threading={ThreadingType.S} color={fromHex('#4444FF')}/>
                <ThreadingCell direction={Direction.Forward} threading={ThreadingType.Z} color={fromHex('#4444FF')}/>
                <ThreadingCell direction={Direction.Backward} threading={ThreadingType.Z} color={fromHex('#4444FF')}/>
            </FocusContainer>
            <Pattern />
        </div>
    </AppProvider>
);

render(
    <Component />,
    document.getElementById('root'),
);

