import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChangePassword, ForgotPassword, Login, Register, ResetPassword, ValidateResetPassword } from '../models/auth.model';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { environment } from '../../../environments/environment';
import { Token } from '@angular/compiler';

type TokenResponse = ApiResponse<'accessToken', string>;
type MessageResponse = ApiResponse<'', string>;

@Injectable({
    providedIn: 'root'
})
export class AuthApiService {

    private authUrl = `${environment.apiUrl}/auth`;


    constructor(private http: HttpClient) { }

    register(data: Register): Observable<TokenResponse> {
        return this.http.post<TokenResponse>(`${this.authUrl}/register`, data);
    }

    login(data: Login): Observable<TokenResponse> {
        return this.http.post<TokenResponse>(`${this.authUrl}/login`, data);
    }

    forgotPassword(data: ForgotPassword): Observable<MessageResponse> {
        return this.http.post<MessageResponse>(`${this.authUrl}/password/forgot`, data);
    }

    validatePasswordResetCode(data: ValidateResetPassword): Observable<MessageResponse> {
        return this.http.post<MessageResponse>(`${this.authUrl}/password/reset-code/validate`, data);
    }

    resetPassword(data: ResetPassword): Observable<MessageResponse> {
        return this.http.put<MessageResponse>(`${this.authUrl}/password/reset`, data);
    }

    changePassword(data: ChangePassword): Observable<MessageResponse> {
        return this.http.put<MessageResponse>(`${this.authUrl}/password/change`, data);
    }

    refreshToken(): Observable<TokenResponse> {
        return this.http.post<TokenResponse>(`${this.authUrl}/token/refresh`, {});
    }

    logout(): Observable<MessageResponse> {
        return this.http.post<MessageResponse>(`${this.authUrl}/logout`, {});
    }

}
