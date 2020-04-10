import {isRight, map} from 'fp-ts/es6/Either';
import {PathReporter} from 'io-ts/es6/PathReporter';
import React, {FC, useRef} from 'react';
import {connect} from 'react-redux';

import {ModalDialog} from '~containers';
import {RootState} from '~reducer';
import {CANCEL} from '~shortcuts';
import {readFileAsString} from '~utils/file';

import {hideImportDialog} from './actions';
import decode from './decode';
import {isImportDialogVisible} from './selectors';
import {TwtFile} from './types';


const mapStateToProps = (state: RootState) => ({
    visible: isImportDialogVisible(state),
});

const mapDispatchToProps = {
    hide: hideImportDialog,
};

type ImportDialogProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const ImportDialog: FC<ImportDialogProps> = ({visible, hide}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const onChange = (): void => {
        const file = inputRef.current?.files?.[0];
        if (file) {
            readFileAsString(file).then((text) => {
                const result = TwtFile.decode(JSON.parse(text));
                if (isRight(result)) {
                    console.log(map(decode)(result));
                } else {
                    alert(PathReporter.report(result));
                }
            });
        }
    };

    return visible ? (
        <ModalDialog
            keyHandlers={{
                [CANCEL]: hide,
            }}
            onOutsideClick={hide}
        >
            <input
                type="file"
                className="mousetrap"
                accept=".twt"
                ref={inputRef}
                onChange={onChange}
            />
        </ModalDialog>
    ) : null;
};

export default connect(mapStateToProps, mapDispatchToProps)(ImportDialog);
