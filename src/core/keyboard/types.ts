export type ListenerType = (commands: string[], callback: () => void) => void;

export type KeyboardContextType = (listener: ListenerType) => () => void;
