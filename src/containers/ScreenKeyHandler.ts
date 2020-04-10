import {connect} from 'react-redux';
import {bindActionCreators,Dispatch} from 'redux';

import {KeyHandler} from '~core/keyboard';

type OwnProps = {
    handlers: {[command: string]: () => void};
}

const mapDispatchToProps = (dispatch: Dispatch, {handlers}: OwnProps) => ({
    handlers: bindActionCreators(handlers, dispatch),
    focus: true,
});

export default connect(undefined, mapDispatchToProps)(KeyHandler);
