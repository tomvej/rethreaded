import React, {FC} from 'react';
import {Field, Form} from 'react-final-form';
import {connect} from 'react-redux';

import {Form as FormComponent} from '~components';
import TextField from '~components/TextField';
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
            <Form onSubmit={(values) => console.log(values)}>
                {({handleSubmit}) => (
                    <FormComponent onSubmit={handleSubmit}>
                        <Field name="name">{({input}) => <TextField {...input} title="Name" />}</Field>
                        <Field name="description">{({input}) => <TextField {...input} title="Description" />}</Field>
                        <Field name="tags">{({input}) => <TextField {...input} title="Tags" />}</Field>
                        <button type="submit">Exportovat</button>
                    </FormComponent>
                )}
            </Form>
        </ModalDialog>
    ) : null;
}

export default connect(mapStateToProps, mapDispatchToProps)(ExportDialog);
