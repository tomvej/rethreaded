import {connect} from 'react-redux';

import {DownloadLink} from '~containers';
import {RootState} from '~reducer';

import {exportThreading} from '../threading';
import {exportThreads} from '../threads';
import {exportWeaving} from '../weaving';
import encode from './encode';
import {getInfo} from './selectors';

// deliberately ineffective, not expected to be called multiple times
const mapStateToProps = (state: RootState) => {
    const info = getInfo(state);
    const threads = exportThreads(state);
    const threading = exportThreading(state);
    const weaving = exportWeaving(state);

    const data = encode({
        ...info,
        threads,
        threading,
        weaving,
    });

    return ({
        name: `${info.name}.twt`,
        data,
    });
};

export default connect(mapStateToProps)(DownloadLink);
