import React, {FC} from 'react';

import {FocusContainer} from '~containers';

import Cells from './Cells';
import {NAME} from './constants';

const Container: FC = () => (
    <FocusContainer id={NAME} keyHandlers={{}}>
        <section>
            <h1>Weaving</h1>
            <Cells />
        </section>
    </FocusContainer>
);

export default Container;
