export const UNDO = 'undo';
export const REDO = 'redo';
export const MOVE_LEFT = 'move-left';
export const MOVE_RIGHT = 'move-right';
export const MOVE_UP = 'move-up';
export const MOVE_DOWN = 'move-down';
export const SET_S_THREADING = 'set-s-threading';
export const SET_Z_THREADING = 'set-z-threading';

const shortcuts: {[command: string]: string | string[]} = {
    [UNDO]: 'ctrl+z',
    [REDO]: 'ctrl+shift+z',
    [MOVE_LEFT]: 'left',
    [MOVE_RIGHT]: 'right',
    [MOVE_UP]: 'up',
    [MOVE_DOWN]: 'down',
    [SET_S_THREADING]: 's',
    [SET_Z_THREADING]: 'z',
};

export default shortcuts;
