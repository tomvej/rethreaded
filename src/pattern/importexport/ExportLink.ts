import {pipe} from 'fp-ts/es6/pipeable';
import {connect} from 'react-redux';

import {DownloadLink} from '~containers';
import {RootState} from '~reducer';

import {exportThreading} from '../threading';
import {exportThreads} from '../threads';
import {exportWeaving} from '../weaving';
import encode from './encode';
import {getInfo} from './selectors';
import {BasicTwtFile} from './types';

// deliberately ineffective, not expected to be called multiple times
const mapStateToProps = (state: RootState) => {
    const info = getInfo(state);
    const threads = exportThreads(state);
    const threading = exportThreading(state);
    const weaving = exportWeaving(state);

    const data = pipe(
        {
            ...info,
            threads,
            threading,
            weaving,
        },
        encode,
        BasicTwtFile.encode,
    );

    return ({
        name: `${info.name}.twt`,
        data,
    });
};

export default connect(mapStateToProps)(DownloadLink);
