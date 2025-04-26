import { computed, Injectable, signal } from "@angular/core";
import { AuthApiService } from "../services/auth-api.service";
import { ChangePassword, ForgotPassword, Login, Register, ResetPassword, ValidateResetPassword } from "../models/auth.model";
import { Router } from "@angular/router";
import { catchError, finalize, Observable, of, switchMap, tap, throwError } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthState {

    private _accessToken = signal<string | null>(null);
    private _resetPasswordCode = signal<string | null>(null);
    private _isTokenRefreshing = signal<boolean>(false);

    readonly isLoggedIn = computed(() => !!this._accessToken());
    readonly accessToken = computed(() => this._accessToken());
    readonly isValidResetPasswordCode = computed(() => !!this._resetPasswordCode());
    readonly resetPasswordCode = computed(() => this._resetPasswordCode());
    readonly isTokenRefreshing = computed(() => this._isTokenRefreshing());

    constructor(private router: Router, private apiService: AuthApiService) {
    }

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
            error: () => {
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
            error: () => {
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

    refreshToken(): Observable<void> {
        this._isTokenRefreshing.set(true);
        return this.apiService.refreshToken().pipe(
            tap((res) => {
                this.setToken(res.data.accessToken);
            }),
            catchError((error) => {
                this.clearToken();
                this.router.navigate(['/login']);
                return throwError(() => error);
            }),
            finalize(() => this._isTokenRefreshing.set(false)),
            switchMap(() => {
                return of(void 0);
            })
        );
    }


    logout() {
        this.apiService.logout().subscribe({
            next: () => {
                this.clearToken();
                this.router.navigate(['/login']);
            }
        });
    }

    initializeAuth() {
        this.refreshToken().subscribe({
            next: () => {
                console.info('Token refreshed on app load');
            },
            error: () => {
                console.info('No valid refresh token, or refresh failed');
                this.clearToken();
            }
        });
    }

}
