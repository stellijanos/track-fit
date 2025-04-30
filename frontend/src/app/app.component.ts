import { Component, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { GlobalMessageComponent } from "./shared/components/global-message/global-message.component";
import { AuthState } from './core/states/auth.state';
import { BottomNavbarComponent } from "./shared/components/bottom-navbar/bottom-navbar.component";
import { CommonModule } from '@angular/common';
import { UserState } from './core/states/user.state';

@Component({
    selector: 'app-root',
    imports: [CommonModule, RouterOutlet, GlobalMessageComponent, BottomNavbarComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'Track-Fit';

    constructor(private authState: AuthState, private userState: UserState, private router: Router) {
        this.authState.initializeAuth();

        effect(() => {
            if (!this.authState.isTokenRefreshing() && this.authState.isLoggedIn()) {
                this.userState.getMe();
            }
        });
    }

    shouldShowNavbar() {
        return !this.router.url.includes('not-found') && this.authState.isLoggedIn();
    }
}
