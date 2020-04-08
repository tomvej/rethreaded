import React, {FC} from 'react';
import {connect} from 'react-redux';

import {ModalDialog} from '~containers';
import {RootState} from '~reducer';
import {CANCEL} from '~shortcuts';

import {hideImportDialog} from './actions';
import {isImportDialogVisible} from './selectors';


const mapStateToProps = (state: RootState) => ({
    visible: isImportDialogVisible(state),
});

const mapDispatchToProps = {
    hide: hideImportDialog,
};

type ImportDialogProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const ImportDialog: FC<ImportDialogProps> = ({visible, hide}) => {
    return visible ? (
        <ModalDialog
            keyHandlers={{
                [CANCEL]: hide,
            }}
            onOutsideClick={hide}
        >
            <input type="file" />
        </ModalDialog>
    ) : null;
};

export default connect(mapStateToProps, mapDispatchToProps)(ImportDialog);
