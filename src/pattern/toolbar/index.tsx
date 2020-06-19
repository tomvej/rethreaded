import React, {FC} from 'react';

import {Toolbar as ToolbarComponent} from '~components';

import ClearButton from './ClearButton';
import ExportButton from './ExportButton';
import ImportButton from './ImportButton';
import RedoButton from './RedoButton';
import RepeatButton from './RepeatButton';
import TextExportButton from './TextExportButton';
import UndoButton from './UndoButton';

const Toolbar: FC = () => (
    <ToolbarComponent>
        <UndoButton />
        <RedoButton />
        <ImportButton />
        <ExportButton />
        <TextExportButton />
        <ClearButton />
        <RepeatButton />
    </ToolbarComponent>
);

export default Toolbar;
