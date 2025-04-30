import { Component, effect, OnInit } from '@angular/core';
import { UserState } from '../../../core/states/user.state';
import { defaultUser } from '../../../core/models/model-defaults';
import { User } from '../../../core/models/user.model';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { calculateAge, calculateBMR, calculateIMC, calculateTDEE } from '../../../shared/functions/formulas';
import { AuthState } from '../../../core/states/auth.state';

@Component({
    selector: 'app-account',
    imports: [CommonModule],
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
    user: User = defaultUser();

    imageUrl = '';

    age = -1;
    imc = '';
    bmr = '';
    tdee = '';

    constructor(private userState: UserState, private authState: AuthState) {
        effect(() => {
            this.user = this.userState.user();
            console.log(this.user);
            this.imageUrl = `${environment.apiUrl}/images/${this.user.profilePicture}`;

            this.age = calculateAge(this.user.birthDate);
            this.bmr = calculateBMR(this.user);
            this.imc = calculateIMC(this.user);
            this.tdee = calculateTDEE(this.user);
        });
    }

    ngOnInit(): void {
        this.userState.getMe();
    }

    logout() {
        this.authState.logout();
    }


}
