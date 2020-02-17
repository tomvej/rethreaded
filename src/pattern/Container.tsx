import React, {FC, Fragment} from 'react';

import {Container as Threading} from './threading';
import {Container as Threads} from './threads';

const Container: FC = () => (
    <Fragment>
        <Threading/>
        <Threads/>
    </Fragment>
);

export default Container;
