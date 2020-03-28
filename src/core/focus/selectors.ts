import {RootState} from '~reducer';

import {getState as getParentState} from '../selectors';
import {NAME} from './constants';
import {StateType} from './reducer';

const getState = (state: RootState): StateType => getParentState(state)[NAME];

const getFocusedContainer = (state: RootState): string | null => getState(state);

export const isFocused = (state: RootState, container: string): boolean => getFocusedContainer(state) === container;
