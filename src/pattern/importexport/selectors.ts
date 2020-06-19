import {RootState} from '~reducer';

import {getModel as getParentModel, getState as getParentState} from '../selectors';
import {NAME} from './constants';
import {StateType} from './reducer';
import {Info} from './types';

const getState = (state: RootState): StateType => getParentState(state)[NAME];
export const getInfo = (state: RootState): Info => getParentModel(state)[NAME];

export const isImportDialogVisible = (state: RootState): boolean => getState(state).importDialogVisible;

export const isExportDialogVisible = (state: RootState): boolean => getState(state).exportDialogVisible;

export const isTextExportDialogVisible = (state: RootState): boolean => getState(state).textExportDialogVisible;
