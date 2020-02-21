export type ListenerType = (commands: string[], callback: () => void) => void;

export type KeyboardContextType = (listener: ListenerType) => () => void;

export type SimpleListenerType = (commands: string[]) => void;

export type ModalKeyboardContextType = (listener: SimpleListenerType) => () => void;
