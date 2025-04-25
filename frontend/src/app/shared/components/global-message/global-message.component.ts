import { Component, inject } from '@angular/core';
import { GlobalMessageState } from '../../../core/states/global-message.state';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-global-message',
    imports: [CommonModule],
    templateUrl: './global-message.component.html',
    styleUrl: './global-message.component.css'
})
export class GlobalMessageComponent {
    private readonly messageState = inject(GlobalMessageState);
    readonly messages = this.messageState.messages;

    dismiss(id: number) {
        this.messageState.dismiss(id);
    }
}
