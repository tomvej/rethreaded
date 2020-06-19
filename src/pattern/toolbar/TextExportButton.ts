import {faFileUpload} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {ToolbarButton} from '~components';

import {showTextExportDialog} from '../importexport';

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onClick: () => dispatch(showTextExportDialog()),
    title: 'Export turning directions',
    icon: faFileUpload,
})

export default connect(undefined, mapDispatchToProps)(ToolbarButton);
