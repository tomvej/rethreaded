import * as uuid from 'uuid';

import {TabletId, ThreadId} from './types';

export const NAME = 'pattern';

export const MIN_THREADS = 2;
export const MIN_TABLETS = 4;
export const MIN_ROWS = 1;

export const initialThreadIds = [uuid.v4(), uuid.v4()] as ThreadId[];
export const initialTabletIds = [uuid.v4(), uuid.v4(), uuid.v4(), uuid.v4()] as TabletId[];
