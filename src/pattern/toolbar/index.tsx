import React, {FC} from 'react';

import {Toolbar as ToolbarComponent} from '~components';

import ExportButton from './ExportButton';
import ImportButton from './ImportButton';
import RedoButton from './RedoButton';
import UndoButton from './UndoButton';

const Toolbar: FC = () => (
    <ToolbarComponent>
        <UndoButton />
        <RedoButton />
        <ImportButton />
        <ExportButton />
    </ToolbarComponent>
);

export default Toolbar;
