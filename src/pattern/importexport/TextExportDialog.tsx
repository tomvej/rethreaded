import React, {FC} from 'react';
import {connect} from 'react-redux';

import {ModalDialog} from '~containers';
import {RootState} from '~reducer';
import {CANCEL} from '~shortcuts';

import {hideTextExportDialog} from './actions';
import {isTextExportDialogVisible} from './selectors';
import TextExport from './TextExport';

const mapStateToProps = (state: RootState) => ({
    visible: isTextExportDialogVisible(state),
});

const mapDispatchToProps = {
    hide: hideTextExportDialog,
};

type TextExportDialogProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const TextExportDialog: FC<TextExportDialogProps> = ({visible, hide}) => visible ? (
    <ModalDialog keyHandlers={{[CANCEL]: hide}} onOutsideClick={hide}>
        <TextExport />
    </ModalDialog>
) : null;

export default connect(mapStateToProps, mapDispatchToProps)(TextExportDialog);
