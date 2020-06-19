import React, {FC} from 'react';

import {MainLayout} from '~components';
import {ScreenKeyHandler} from '~containers';

import {ExportDialog, ImportDialog, TextExportDialog} from './importexport';
import {Container as Preview} from './preview';
import shortcuts from './shortcuts';
import {Container as Threading} from './threading';
import {Container as Threads} from './threads';
import Toolbar from './toolbar';
import {Container as Weaving} from './weaving';

const Container: FC = () => (
    <ScreenKeyHandler handlers={shortcuts}>
        <MainLayout
            toolbar={<Toolbar/>}
            info={<Preview/>}
        >
            <ImportDialog/>
            <ExportDialog/>
            <TextExportDialog />
            <Weaving/>
            <Threading/>
            <Threads/>
        </MainLayout>
    </ScreenKeyHandler>
);

export default Container;
