import {EXPORT, IMPORT} from '~shortcuts';

import {showImportDialog} from './importexport';
import {showExportDialog} from './importexport/actions';

export default {
    [IMPORT]: showImportDialog,
    [EXPORT]: showExportDialog,
}
