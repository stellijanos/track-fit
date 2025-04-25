export type MessageType = 'success' | 'error' | 'info';

export interface GlobalMessage {
    id: number;
    type: MessageType;
    text: string;
}
