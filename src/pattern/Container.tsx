import React, {FC, Fragment} from 'react';

import {Container as Threading} from './threading';
import {Container as Threads} from './threads';
import {Container as Weaving} from './weaving';

const Container: FC = () => (
    <Fragment>
        <Weaving />
        <Threading/>
        <Threads/>
    </Fragment>
);

export default Container;
