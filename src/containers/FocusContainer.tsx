import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {FocusArea} from '~components';
import {focusGained, focusLost} from '~core/focus';

type OwnProps = {
    id: string;
};

const mapDispatchToProps = (dispatch: Dispatch, {id}: OwnProps) => ({
    onFocus: () => dispatch(focusGained(id)),
    onBlur: () => dispatch(focusLost(id)),
});

const FocusContainer = connect(undefined, mapDispatchToProps)(FocusArea);

export default FocusContainer;
