import React, {FC} from 'react';

import {FocusContainer} from '~containers';

import Cells from './Cells';
import {NAME} from './constants';
import shortcuts from './shortcuts';

const Container: FC = () => (
    <FocusContainer id={NAME} keyHandlers={shortcuts}>
        <section>
            <h1>Threading</h1>
            <Cells />
        </section>
    </FocusContainer>
);

export default Container;
