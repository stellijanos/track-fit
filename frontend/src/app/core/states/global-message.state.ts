// global-message.state.ts
import { computed, Injectable, signal } from '@angular/core';
import { GlobalMessage, MessageType } from '../models/global-message.model';

@Injectable({ providedIn: 'root' })
export class GlobalMessageState {
    private idCounter = 0;
    private readonly _messages = signal<GlobalMessage[]>([]);

    readonly messages = computed(() => this._messages());

    show(type: MessageType, text: string, autoDismiss = true, duration = 4000) {
        const id = ++this.idCounter;
        const newMsg: GlobalMessage = { id, type, text };
        this._messages.set([...this._messages(), newMsg]);

        if (autoDismiss) {
            setTimeout(() => this.dismiss(id), duration);
        }
    }

    dismiss(id: number) {
        this._messages.update(messages => messages.filter(msg => msg.id !== id));
    }

    clearAll() {
        this._messages.set([]);
    }
}
