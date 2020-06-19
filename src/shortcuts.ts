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
export const SELECT_THREAD_4 = 'select-thread-4';
export const SELECT_THREAD_5 = 'select-thread-5';
export const SELECT_THREAD_6 = 'select-thread-6';
export const SELECT_THREAD_7 = 'select-thread-7';
export const SELECT_THREAD_8 = 'select-thread-8';
export const SELECT_THREAD_9 = 'select-thread-9';
export const SELECT_THREAD_0 = 'select-thread-0';
export const APPLY = 'apply';
export const CANCEL = 'cancel';
export const TURN_FORWARD = 'turn-forward';
export const TURN_BACKWARD = 'turn-backward';
export const TURN_ALL_FORWARD = 'turn-all-forward';
export const TURN_ALL_BACKWARD = 'turn-all-backward';
export const ADD = 'add';
export const ADD_ALT = 'add-alt';
export const REMOVE = 'remove';
export const IMPORT = 'import';
export const EXPORT = 'export';
export const RESET = 'reset';

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
    [SELECT_THREAD_4]: '4',
    [SELECT_THREAD_5]: '5',
    [SELECT_THREAD_6]: '6',
    [SELECT_THREAD_7]: '7',
    [SELECT_THREAD_8]: '8',
    [SELECT_THREAD_9]: '9',
    [SELECT_THREAD_0]: '0',
    [APPLY]: 'space',
    [CANCEL]: 'escape',
    [TURN_BACKWARD]: 'b',
    [TURN_FORWARD]: 'f',
    [TURN_ALL_BACKWARD]: 'ctrl+b',
    [TURN_ALL_FORWARD]: 'ctrl+f',
    [ADD]: 'ins',
    [ADD_ALT]: 'shift+ins',
    [REMOVE]: 'del',
    [IMPORT]: 'ctrl+i',
    [EXPORT]: 'ctrl+e',
    [RESET]: 'ctrl+r',
};

export default shortcuts;
