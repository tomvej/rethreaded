import React, {FunctionComponent} from 'react';
import {render} from 'react-dom';
import {fromHex} from '~utils/color';
import {ThreadingCell} from '~components';
import {Direction, ThreadingType} from '~types';
import {FocusContainer} from '~containers';
import {Container as Pattern} from './pattern';

import AppProvider from './AppProvider';
import './style.scss';

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

