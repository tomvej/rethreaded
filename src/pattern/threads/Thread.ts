import {connect} from 'react-redux';

import {Thread} from '~components';
import {RootState} from '~reducer';

import {getColor} from './selectors';

type OwnProps = {
    number: number;
};

const mapStateToProps = (state: RootState, {number}: OwnProps) => ({
    color: getColor(state, number),
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mergeProps = ({color}: StateProps, _: any, {number}: OwnProps) => ({
    color,
    label: String(number),
});

export default connect(mapStateToProps, undefined, mergeProps)(Thread);
