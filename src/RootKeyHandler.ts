import {ReactNode} from 'react';
import {connect} from 'react-redux';

import {KeyHandler} from '~core/keyboard';
import {REDO, UNDO} from '~shortcuts';

/******************************/

const mapDispatchToProps = {
    [UNDO]: () => ({type: 'undo'}),
    [REDO]: () => ({type: 'redo'}),
};

/******************************/

type DispatchProps = ({[command: string]: () => void});
type OwnProps = {children: ReactNode};

const mergeProps = (unusedStateProps: any, dispatchProps: DispatchProps, {children}: OwnProps) => ({
    focus: true,
    handlers: dispatchProps,
    children,
});

export default connect(undefined, mapDispatchToProps, mergeProps)(KeyHandler);
