import { Component, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UserState } from '../../../core/states/user.state';
import { AuthState } from '../../../core/states/auth.state';
import { User } from '../../../core/models/user.model';
import { defaultUser } from '../../../core/models/model-defaults';
import { calculateAge, calculateBMR, calculateIMC, calculateTDEE } from '../../../shared/functions/formulas';
import { ProfilePictureComponent } from "../../../components/other/profile-picture/profile-picture.component";

@Component({
    selector: 'app-account',
    imports: [CommonModule, RouterModule, ProfilePictureComponent],
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
    user: User = defaultUser();

    age = -1;
    imc = '';
    bmr = '';
    tdee = '';

    constructor(private userState: UserState, private authState: AuthState, private router: Router) {
        effect(() => {
            this.user = this.userState.user();
            console.log(this.user);

            this.age = calculateAge(this.user.birthDate);
            this.bmr = calculateBMR(this.user);
            this.imc = calculateIMC(this.user);
            this.tdee = calculateTDEE(this.user);
        });
    }

    ngOnInit(): void {
    }

    logout() {
        this.authState.logout();
    }


}
