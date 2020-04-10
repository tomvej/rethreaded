import React, {FC} from 'react';
import {connect} from 'react-redux';

import {ModalDialog} from '~containers';
import {RootState} from '~reducer';
import {CANCEL} from '~shortcuts';

import {hideExportDialog} from './actions';
import {isExportDialogVisible} from './selectors';

const mapStateToProps = (state: RootState) => ({
    visible: isExportDialogVisible(state),
});

const mapDispatchToProps = {
    hide: hideExportDialog,
};

type ExportDialogProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const ExportDialog: FC<ExportDialogProps> = ({visible, hide}) => {
    return visible ? (
        <ModalDialog
            keyHandlers={{
                [CANCEL]: hide,
            }}
            onOutsideClick={hide}
        >
            <form>
                <button type="submit">Exportovat</button>
            </form>
        </ModalDialog>
    ) : null;
}

export default connect(mapStateToProps, mapDispatchToProps)(ExportDialog);
