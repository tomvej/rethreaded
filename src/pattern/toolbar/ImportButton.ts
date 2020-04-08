import {faDownload} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {ToolbarButton} from '~components';

import {showImportDialog} from '../importexport';

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onClick: () => dispatch(showImportDialog()),
    title: 'Import',
    icon: faDownload,
});

export default connect(undefined, mapDispatchToProps)(ToolbarButton);
