import {EXPORT, IMPORT, RESET} from '~shortcuts';

import {clear} from './actions';
import {showImportDialog} from './importexport';
import {showExportDialog} from './importexport/actions';

export default {
    [IMPORT]: showImportDialog,
    [EXPORT]: showExportDialog,
    [RESET]: clear,
}
