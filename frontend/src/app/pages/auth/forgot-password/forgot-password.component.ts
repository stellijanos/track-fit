import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthState } from '../../../core/states/auth.state';
import { ForgotPassword } from '../../../core/models/auth.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-forgot-password',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css', '../styles.css']
})
export class ForgotPasswordComponent {
    form !: FormGroup;

    constructor(private fb: FormBuilder, private authState: AuthState) {
    }


    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.form = this.fb.group({
            credential: ['', Validators.required]
        });
    }

    onSubmit() {
        if (!this.form.valid) return;
        this.authState.forgotPassword(this.form.value as ForgotPassword);
    }

}
