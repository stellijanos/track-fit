import { CommonModule } from '@angular/common';
import { Component, effect, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { User } from '../../../core/models/user.model';
import { UserState } from '../../../core/states/user.state';
import { AuthState } from '../../../core/states/auth.state';
import { defaultUser } from '../../../core/models/model-defaults';

@Component({
    selector: 'app-my-profile-form',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
    templateUrl: './my-profile-form.component.html',
    styleUrls: ['./my-profile-form.component.css', '../style.css']
})
export class MyProfileFormComponent implements OnInit {

    form: FormGroup = new FormGroup({});
    user: User = defaultUser();

    constructor(private fb: FormBuilder, private userState: UserState, private authState: AuthState) {
        effect(() => {
            if (this.userState.userReady()) {
                this.user = this.userState.user();
                this.initForm();
            }
        })
    }

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.form = this.fb.group({
            firstName: [this.user.firstName, Validators.required],
            lastName: [this.user.lastName, Validators.required],
            email: [this.user.email, [Validators.required, Validators.email]],
            phone: [this.user.phone, Validators.required],
            birthDate: [this.user.birthDate, Validators.required],
            gender: [this.user.gender, [Validators.required, Validators.pattern(/^(male|female|other)$/)]],
            height: [this.user.height],
        });
    }

    onSubmit() {
        if (!this.form.valid) return;
        if (!this.form.value.height) {
            this.form.value.height = undefined;
        }
        this.userState.updateMe(this.form.value as User);
    }
}
