import { computed, Injectable, signal } from "@angular/core";
import { AuthApiService } from "../services/auth-api.service";
import { ChangePassword, ForgotPassword, Login, Register, ResetPassword, ValidateResetPassword } from "../models/auth.model";
import { Router } from "@angular/router";


@Injectable({ providedIn: 'root' })
export class AuthState {

    private _accessToken = signal<string | null>(null);
    private _resetPasswordCode = signal<string | null>(null);

    readonly isLoggedIn = computed(() => !!this._accessToken());
    readonly isValidResetPasswordCode = computed(() => !!this._resetPasswordCode());
    readonly resetPasswordCode = computed(() => this._resetPasswordCode());

    constructor(private router: Router, private apiService: AuthApiService) { }


    private setToken(token: string) {
        this._accessToken.set(token);
    }

    private clearToken() {
        this._accessToken.set(null);
    }

    private setResetPasswordCode(code: string) {
        this._resetPasswordCode.set(code);
    }

    private clearResetPasswordCode() {
        this._resetPasswordCode.set(null);
    }

    register(data: Register) {
        this.apiService.register(data).subscribe({
            next: (response) => {
                this.setToken(response.data.accessToken);
                this.router.navigate(['/']);
            },
            error: (response) => {
                console.error(response.error.message)
                this.clearToken();
            }
        });
    }

    login(data: Login) {
        this.apiService.login(data).subscribe({
            next: (response) => {
                this.setToken(response.data.accessToken);
                this.router.navigate(['/']);
            },
            error: (response) => {
                console.error(response.error.message)
                this.clearToken();
            }
        });
    }

    forgotPassword(data: ForgotPassword) {
        this.apiService.forgotPassword(data).subscribe({
            next: (response) => {

            },
            error: (response) => {
                console.error(response.error.message)
            }
        });
    }

    validatePasswordResetCode(data: ValidateResetPassword) {
        this.apiService.validatePasswordResetCode(data).subscribe({
            next: (response) => {
                this.setResetPasswordCode(data.code);
            },
            error: (response) => {
                console.error(response.error.message);
                this.clearResetPasswordCode();
            }
        });
    }

    resetPassword(data: ResetPassword) {
        this.apiService.resetPassword(data).subscribe({
            next: (response) => {
                this.router.navigate(['/login']);
            },
            error: (response) => {
                console.error(response.error.message)
            }
        });
    }

    changePassword(data: ChangePassword) {
        this.apiService.changePassword(data).subscribe({
            next: (response) => {

            },
            error: (response) => {
                console.error(response.error.message)
            }
        });
    }

    refreshToken() {
        this.apiService.refreshToken().subscribe({
            next: (response) => {

            },
            error: (response) => {
                console.error(response.error.message)
                this.clearToken();
            }
        });
    }

    logout() {
        this.apiService.logout().subscribe({
            next: (response) => {
                this.clearToken();
            },
            error: (response) => {
                console.error(response.error.message)
            }
        });
    }
}
