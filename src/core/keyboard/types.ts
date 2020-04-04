export type ListenerType = (event: ExtendedKeyboardEvent, commands: string[], callback: () => void) => void;

export type KeyboardContextType = (listener: ListenerType) => () => void;

export type SimpleListenerType = (event: ExtendedKeyboardEvent,commands: string[]) => void;

export type ModalKeyboardContextType = (listener: SimpleListenerType) => () => void;
