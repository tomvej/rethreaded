import React, {FC} from 'react';

import {RowLayout} from '~components';

import {ImportDialog} from './importexport';
import {Container as Preview} from './preview';
import {Container as Threading} from './threading';
import {Container as Threads} from './threads';
import Toolbar from './toolbar';
import {Container as Weaving} from './weaving';

const Container: FC = () => (
    <RowLayout>
        <ImportDialog />
        <Toolbar />
        <div>
            <Weaving/>
            <Threading/>
            <Threads/>
        </div>
        <Preview />
    </RowLayout>
);

export default Container;
