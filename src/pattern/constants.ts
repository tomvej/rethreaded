import {TabletId, ThreadId} from './types';
import {createIds} from './utils';

export const NAME = 'pattern';

export const MIN_THREADS = 2;
export const MIN_TABLETS = 4;
export const MIN_ROWS = 1;

export const initialThreadIds = createIds<ThreadId>(MIN_THREADS);
export const initialTabletIds = createIds<TabletId>(MIN_TABLETS);
