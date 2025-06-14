import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthState } from '../../../core/states/auth.state';
import { ResetPassword } from '../../../core/models/auth.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { matchValidator } from '../../../core/validators/password-match.validator';

@Component({
    selector: 'app-reset-password-form',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
    templateUrl: './reset-password-form.component.html',
    styleUrls: ['./reset-password-form.component.css', '../style.css']
})
export class ResetPasswordFormComponent implements OnInit {
    form !: FormGroup;
    showPassword = false;

    constructor(private fb: FormBuilder, private authState: AuthState) { }

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.form = this.fb.group({
            code: [this.authState.resetPasswordCode(), Validators.required],
            password: ['', Validators.required],
            passwordConfirm: ['', Validators.required],
        }, {
            validators: matchValidator('password', 'passwordConfirm')
        });
    }

    onSubmit() {
        console.log(this.form.value);
        if (!this.form.valid) return;
        this.authState.resetPassword(this.form.value as ResetPassword);
    }


    togglePasswordVisibility(): void {
        this.showPassword = !this.showPassword;
    }
}
