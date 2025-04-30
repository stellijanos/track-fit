import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangePassword } from '../../../core/models/auth.model';
import { AuthState } from '../../../core/states/auth.state';
import { matchValidator } from '../../../core/validators/password-match.validator';

@Component({
    selector: 'app-change-password-form',
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './change-password-form.component.html',
    styleUrl: './change-password-form.component.css'
})
export class ChangePasswordFormComponent implements OnInit {

    form !: FormGroup;

    constructor(private fb: FormBuilder, private authState: AuthState) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            currentPassword: ['', [Validators.required]],
            newPassword: ['', [Validators.required]],
            newPasswordConfirm: ['', [Validators.required]],
        }, {
            validators: matchValidator('newPassword', 'newPasswordConfirm')
        });
    }

    onSubmit() {
        console.log(this.form.value);
        if (this.form.invalid) return;
        this.authState.changePassword(this.form.value as ChangePassword);
        this.ngOnInit();
    }
}
