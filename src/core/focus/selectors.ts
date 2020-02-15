import {RootState} from '../../reducer';
import {getModel as getParentModel} from '../selectors';
import {NAME} from './constants';
import {StateType} from './reducer';

const getModel = (state: RootState): StateType => getParentModel(state)[NAME];

const getFocusedContainer = (state: RootState): string | null => getModel(state);

export const isFocused = (state: RootState, container: string): boolean => getFocusedContainer(state) === container;
