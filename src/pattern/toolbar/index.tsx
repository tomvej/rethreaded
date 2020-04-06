import React, {FC} from 'react';

import {Toolbar as ToolbarComponent} from '~components';

import RedoButton from './RedoButton';
import UndoButton from './UndoButton';

const Toolbar: FC = () => (
    <ToolbarComponent>
        <UndoButton />
        <RedoButton />
    </ToolbarComponent>
);

export default Toolbar;
