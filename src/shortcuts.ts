export const UNDO = 'undo';
export const REDO = 'redo';
export const MOVE_LEFT = 'move-left';
export const MOVE_RIGHT = 'move-right';
export const MOVE_UP = 'move-up';
export const MOVE_DOWN = 'move-down';
export const SET_S_THREADING = 'set-s-threading';
export const SET_Z_THREADING = 'set-z-threading';
export const SELECT_THREAD_1 = 'select-thread-1';
export const SELECT_THREAD_2 = 'select-thread-2';
export const SELECT_THREAD_3 = 'select-thread-3';

const shortcuts: {[command: string]: string | string[]} = {
    [UNDO]: 'ctrl+z',
    [REDO]: 'ctrl+shift+z',
    [MOVE_LEFT]: 'left',
    [MOVE_RIGHT]: 'right',
    [MOVE_UP]: 'up',
    [MOVE_DOWN]: 'down',
    [SET_S_THREADING]: 's',
    [SET_Z_THREADING]: 'z',
    [SELECT_THREAD_1]: '1',
    [SELECT_THREAD_2]: '2',
    [SELECT_THREAD_3]: '3',
};

export default shortcuts;
