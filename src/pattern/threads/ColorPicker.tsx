import React, {FC} from 'react';
import {connect, ConnectedProps} from 'react-redux';

import {ColorPicker as ColorPickerContainer} from '~containers';
import {RootState} from '~reducer';

import {hidePicker, setColor} from './actions';
import {getCurrentColor, isPickerVisible} from './selectors';

const mapStateToProps = (state: RootState) => ({
    display: isPickerVisible(state),
    color: getCurrentColor(state),
});

const mapDispatchToProps = {
    onColorChange: setColor,
    onClose: hidePicker,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ConnectProps = ConnectedProps<typeof connector>;

const ColorPicker: FC<ConnectProps> = ({display, ...props}) => (
    display ? <ColorPickerContainer {...props} /> : null
);

export default connector(ColorPicker);
