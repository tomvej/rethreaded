import React, {FC} from 'react';
import {Manager} from 'react-popper';

import {FocusContainer} from '~containers';

import ColorPicker from './ColorPicker';
import {NAME} from './constants';
import shortcuts from './shortcuts';
import Threads from './Threads';


const Container: FC = () => (
    <FocusContainer id={NAME} keyHandlers={shortcuts}>
        <section>
            <h1>Threads</h1>
            <Manager>
                <Threads/>
                <ColorPicker/>
            </Manager>
        </section>
    </FocusContainer>
);

export default Container;
