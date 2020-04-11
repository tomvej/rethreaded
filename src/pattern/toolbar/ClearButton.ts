import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {ToolbarButton} from '~components';

import {clear} from '../actions';

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onClick: () => dispatch(clear()),
    title: 'Clear',
    icon: faTrash
});

export default connect(undefined, mapDispatchToProps)(ToolbarButton);
