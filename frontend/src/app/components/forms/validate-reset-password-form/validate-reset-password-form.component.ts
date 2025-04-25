import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthState } from '../../../core/states/auth.state';
import { ValidateResetPassword } from '../../../core/models/auth.model';

@Component({
    selector: 'app-validate-reset-password-form',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
    templateUrl: './validate-reset-password-form.component.html',
    styleUrls: ['./validate-reset-password-form.component.css', '../style.css']
})
export class ValidateResetPasswordFormComponent implements OnInit {

    form !: FormGroup;

    constructor(private fb: FormBuilder, private authState: AuthState) { }

    ngOnInit(): void {
        this.initForm();
    }

    initForm(code: string = '') {
        this.form = this.fb.group({
            code: [code, Validators.required]
        });
    }

    onSubmit() {
        if (!this.form.valid) return;
        this.authState.validatePasswordResetCode(this.form.value as ValidateResetPassword);
    }
}
