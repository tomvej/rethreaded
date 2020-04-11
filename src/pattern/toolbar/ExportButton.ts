import {faUpload} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {ToolbarButton} from '~components';

import {showExportDialog} from '../importexport/actions';

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onClick: () => dispatch(showExportDialog()),
    title: 'Export',
    icon: faUpload,
});

export default connect(undefined, mapDispatchToProps)(ToolbarButton);
