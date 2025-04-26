import { CommonModule } from '@angular/common';
import { Component, effect, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { User } from '../../../core/models/user.model';
import { UserState } from '../../../core/states/user.state';
import { AuthState } from '../../../core/states/auth.state';

@Component({
    selector: 'app-my-profile-form',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
    templateUrl: './my-profile-form.component.html',
    styleUrls: ['./my-profile-form.component.css', '../style.css']
})
export class MyProfileFormComponent implements OnInit {

    form !: FormGroup;

    constructor(private fb: FormBuilder, private userState: UserState, private authState: AuthState) {
        effect(() => {
            if (!this.authState.isTokenRefreshing() && this.authState.isLoggedIn()) {
                this.userState.getMe();

            }
        });

        effect(() => {
            if (this.userState.userReady()) {
                this.initForm();
            }
        })
    }

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        console.log(this.userState.user());
        this.form = this.fb.group({
            firstName: [this.userState.user().firstName, Validators.required],
            lastName: [this.userState.user().lastName, Validators.required],
            email: [this.userState.user().email, [Validators.required, Validators.email]],
            phone: [this.userState.user().phone, Validators.required],
            birthDate: [this.userState.user().birthDate, Validators.required],
            gender: ['', [Validators.required, Validators.pattern(/^(male|female|other)$/)]],
            height: [],
        });
    }

    onSubmit() {
        if (!this.form.valid) return;
        this.userState.updateMe(this.form.value as User);
    }
}
