import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalMessageComponent } from "./shared/components/global-message/global-message.component";
import { AuthState } from './core/states/auth.state';
import { BottomNavbarComponent } from "./shared/components/bottom-navbar/bottom-navbar.component";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, GlobalMessageComponent, BottomNavbarComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'Track-Fit';

    private authState = inject(AuthState);

    constructor() {
        this.authState.initializeAuth();
    }
}
