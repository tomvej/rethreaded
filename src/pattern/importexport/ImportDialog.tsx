import {fold, left, map} from 'fp-ts/es6/Either';
import {pipe} from 'fp-ts/es6/pipeable';
import {PathReporter} from 'io-ts/es6/PathReporter';
import React, {FC, useRef} from 'react';
import {connect} from 'react-redux';

import {ModalDialog} from '~containers';
import {RootState} from '~reducer';
import {CANCEL} from '~shortcuts';
import {readFileAsString} from '~utils/file';

import {importDesign} from '../actions';
import {hideImportDialog} from './actions';
import decode from './decode';
import {isImportDialogVisible} from './selectors';
import {TwtFile} from './types';


const mapStateToProps = (state: RootState) => ({
    visible: isImportDialogVisible(state),
});

const mapDispatchToProps = {
    hide: hideImportDialog,
    importDesign,
};

type ImportDialogProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const ImportDialog: FC<ImportDialogProps> = ({visible, hide, importDesign}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const onChange = (): void => {
        const file = inputRef.current?.files?.[0];
        if (file) {
            readFileAsString(file).then((text) => {
               pipe(
                    text,
                    JSON.parse,
                    TwtFile.decode,
                    map(decode),
                    fold(
                        (result) => () => {
                            hide();
                            alert(PathReporter.report(left(result)));
                        },
                        (data) => () => importDesign(data),
                    )
                )();
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
