import React, {FC, useCallback, useState} from 'react';
import {Field, Form} from 'react-final-form';
import {connect} from 'react-redux';

import {Form as FormComponent} from '~components';
import TextField from '~components/TextField';
import {DownloadLink, ModalDialog} from '~containers';
import {RootState} from '~reducer';
import {CANCEL} from '~shortcuts';

import {hideExportDialog, setInfo} from './actions';
import {getInfo, isExportDialogVisible} from './selectors';
import {Info} from './types';

const mapStateToProps = (state: RootState) => ({
    visible: isExportDialogVisible(state),
    values: getInfo(state),
});

const mapDispatchToProps = {
    hide: hideExportDialog,
    setValues: setInfo,
};

type ExportDialogProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const ExportDialog: FC<ExportDialogProps> = ({visible, hide, values, setValues}) => {
    const [submitted, setSubmitted] = useState(false);
    const onSubmit = useCallback((values: Info) => {
        setValues(values);
        setSubmitted(true);
    }, []);
    return visible ? (
        <ModalDialog
            keyHandlers={{
                [CANCEL]: hide,
            }}
            onOutsideClick={hide}
        >
            <Form onSubmit={onSubmit} initialValues={values}>
                {({handleSubmit}) => (
                    <FormComponent onSubmit={handleSubmit}>
                        <Field name="name">{({input}) => <TextField {...input} title="Name" />}</Field>
                        <Field name="description">{({input}) => <TextField {...input} title="Description" />}</Field>
                        <Field name="tags">{({input}) => <TextField {...input} title="Tags" />}</Field>
                        <button type="submit">Exportovat</button>
                    </FormComponent>
                )}
            </Form>
            {submitted && (
                <DownloadLink
                    data={values}
                    name="data"
                    onDownload={() => {
                        setSubmitted(false);
                        hide();
                    }}
                />)
            }
        </ModalDialog>
    ) : null;
}

export default connect(mapStateToProps, mapDispatchToProps)(ExportDialog);
