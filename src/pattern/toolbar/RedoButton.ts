import {connect} from 'react-redux';

import {ToolbarButton} from '~components';
import {redo} from '~core/undo';
import {RootState} from '~reducer';

import {canRedo} from '../selectors';

const mapStateToProps = (state: RootState) => ({
    disabled: !canRedo(state),
});
type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = {
    onClick: redo,
};
type DispatchProps = typeof mapDispatchToProps;

const mergeProps = (stateProps: StateProps, dispatchProps: DispatchProps) => ({
    ...stateProps,
    ...dispatchProps,
    children: 'redo',
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ToolbarButton);
