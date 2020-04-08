import {RootState} from '~reducer';

import {getState as getParentState} from '../selectors';
import {NAME} from './constants';
import {StateType} from './reducer';

const getState = (state: RootState): StateType => getParentState(state)[NAME];

export const isImportDialogVisible = (state: RootState): boolean => getState(state).importDialogVisible;
