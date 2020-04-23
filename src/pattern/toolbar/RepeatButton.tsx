import {faRetweet} from '@fortawesome/free-solid-svg-icons';
import {fold, left} from 'fp-ts/es6/Either';
import {pipe} from 'fp-ts/es6/pipeable';
import {PathReporter} from 'io-ts/es6/PathReporter';
import {connect} from 'react-redux';

import {ToolbarButton} from '~components';
import {RootState} from '~reducer';

import {doesRepeat, setRepeatPattern, setSinglePattern} from '../preview';
import {IntFromString} from './types';

const mapStateToProps = (state: RootState) => ({
    active: doesRepeat(state),
});
type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = {
    setSingle: setSinglePattern,
    setRepeat: setRepeatPattern,
};
type DispatchProps = typeof mapDispatchToProps;



const mergeProps = ({active}: StateProps, {setSingle, setRepeat}: DispatchProps) => ({
    onClick: () => {
        if (active) {
            setSingle();
        } else {
            pipe(
                prompt('Number of repetitions:', '2'),
                IntFromString.decode,
                fold(
                    (errors) => () => alert(PathReporter.report(left(errors))),
                    (number) => () => setRepeat(number),
                ),
            )();
        }
    },
    icon: faRetweet,
    title: 'Repeat',
    active,
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ToolbarButton);
