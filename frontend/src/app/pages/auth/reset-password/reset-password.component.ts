import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ValidateResetPasswordFormComponent } from "../../../components/forms/validate-reset-password-form/validate-reset-password-form.component";
import { AuthState } from '../../../core/states/auth.state';
import { ForgotPasswordComponent } from "../forgot-password/forgot-password.component";
import { ResetPasswordFormComponent } from "../../../components/forms/reset-password-form/reset-password-form.component";

@Component({
    selector: 'app-reset-password',
    imports: [CommonModule, RouterModule, ValidateResetPasswordFormComponent, ResetPasswordFormComponent],
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css', '../styles.css']
})
export class ResetPasswordComponent implements AfterViewInit {

    @ViewChild('validateResetPasswordForm')
    validateResetPasswordForm !: ValidateResetPasswordFormComponent;

    constructor(private route: ActivatedRoute, private authState: AuthState) {
    }


    showValidateForm() {
        return !this.authState.isValidResetPasswordCode();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.route.queryParamMap.subscribe(params => {
                const code = params.get('code') || '';
                this.validateResetPasswordForm.initForm(code);
            });
        });
    }

}
