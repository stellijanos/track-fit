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
            next: (res) => {
                this.setToken(res.data.accessToken);
                this.router.navigate(['/']);
            },
            error: (res) => {
                this.clearToken();
            }
        });
    }

    login(data: Login) {
        this.apiService.login(data).subscribe({
            next: (res) => {
                this.setToken(res.data.accessToken);
                this.router.navigate(['/']);
            },
            error: (res) => {
                console.error()
                this.clearToken();
            }
        });
    }

    forgotPassword(data: ForgotPassword) {
        this.apiService.forgotPassword(data);
    }

    validatePasswordResetCode(data: ValidateResetPassword) {
        this.apiService.validatePasswordResetCode(data).subscribe({
            next: () => {
                this.setResetPasswordCode(data.code);
            },
            error: () => {
                this.clearResetPasswordCode();
            }
        });
    }

    resetPassword(data: ResetPassword) {
        this.apiService.resetPassword(data).subscribe({
            next: () => {
                this.router.navigate(['/login']);
            }
        });
    }

    changePassword(data: ChangePassword) {
        this.apiService.changePassword(data);
    }

    refreshToken() {
        this.apiService.refreshToken().subscribe({
            next: () => {
            },
            error: () => {
                this.clearToken();
            }
        });
    }

    logout() {
        this.apiService.logout().subscribe({
            next: () => {
                this.clearToken();
            }
        });
    }
}
