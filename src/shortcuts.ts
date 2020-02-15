export const UNDO = 'undo';
export const REDO = 'redo';

const shortcuts: {[command: string]: string | string[]} = {
    [UNDO]: 'ctrl+z',
    [REDO]: 'ctrl+shift+z',
};

export default shortcuts;
