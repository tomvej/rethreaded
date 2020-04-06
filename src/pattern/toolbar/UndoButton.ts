import {faUndoAlt} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';

import {ToolbarButton} from '~components';
import {undo} from '~core/undo';
import {RootState} from '~reducer';

import {canUndo} from '../selectors';

const mapStateToProps = (state: RootState) => ({
    disabled: !canUndo(state),
});
type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = {
    onClick: undo,
};
type DispatchProps = typeof mapDispatchToProps;

const mergeProps = (stateProps: StateProps, dispatchProps: DispatchProps) => ({
    ...stateProps,
    ...dispatchProps,
    title: 'Undo',
    icon: faUndoAlt,
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ToolbarButton);
