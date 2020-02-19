import {Hole} from '~types';

import {NAME} from './constants';

export const SELECT_AND_APPLY_THREAD = `${NAME}/select-apply-thread` as 'select-apply-thread';

export interface SelectAndApplyThreadActionType {
    type: typeof SELECT_AND_APPLY_THREAD;
    tablet: number;
    hole: Hole;
}

export const selectAndApplyThread = (tablet: number, hole: Hole): SelectAndApplyThreadActionType => ({
    type: SELECT_AND_APPLY_THREAD,
    tablet,
    hole,
});
