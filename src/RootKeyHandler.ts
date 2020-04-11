import {ReactNode} from 'react';
import {connect} from 'react-redux';

import {KeyHandler} from '~core/keyboard';
import {redo, undo} from '~core/undo';
import {REDO, UNDO} from '~shortcuts';

/******************************/

const mapDispatchToProps = {
    [UNDO]: undo,
    [REDO]: redo,
};

/******************************/

type DispatchProps = typeof mapDispatchToProps;
type OwnProps = {children: ReactNode};

const mergeProps = (unusedStateProps: unknown, dispatchProps: DispatchProps, {children}: OwnProps) => ({
    focus: true,
    handlers: dispatchProps,
    children,
});

export default connect(undefined, mapDispatchToProps, mergeProps)(KeyHandler);
