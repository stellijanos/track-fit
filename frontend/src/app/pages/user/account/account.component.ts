import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthState } from '../../../core/states/auth.state';
import { ProfileComponent } from "../../../components/other/profile/profile.component";

@Component({
    selector: 'app-account',
    imports: [CommonModule, RouterModule, ProfileComponent],
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
})
export class AccountComponent {

    constructor(private authState: AuthState) {
    }

    logout() {
        this.authState.logout();
    }
}
