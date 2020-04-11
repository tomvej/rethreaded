import {connect} from 'react-redux';

import {DownloadLink} from '~containers';
import {RootState} from '~reducer';

import {getInfo} from './selectors';

const mapStateToProps = (state: RootState) => ({
    info: getInfo(state),
});

type StateProps = ReturnType<typeof mapStateToProps>;

type OwnProps = {
    onDownload: () => void;
}

const mergeProps = ({info}: StateProps, dispatchProps: unknown, {onDownload}: OwnProps) => ({
    name: `${info.name}.twt`,
    data: info,
    onDownload,
});

export default connect(mapStateToProps, undefined, mergeProps)(DownloadLink);
