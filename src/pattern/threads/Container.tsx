import React, {FC} from 'react';

import {FocusContainer} from '~containers';

import {NAME} from './constants';
import shortcuts from './shortcuts';
import Threads from './Threads';


const Container: FC = () => (
    <FocusContainer id={NAME} keyHandlers={shortcuts}>
        <section>
            <h1>Threads</h1>
            <Threads />
        </section>
    </FocusContainer>
);

export default Container;
