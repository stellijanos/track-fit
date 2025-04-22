import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

type UserResponse = ApiResponse<'user', User>;

@Injectable({
    providedIn: 'root'
})
export class UserApiService {

    private url = `${environment.apiUrl}/users/me`;

    constructor(private http: HttpClient) { }

    getMe(): Observable<UserResponse> {
        return this.http.get<UserResponse>(this.url);
    }

    updateMe(data: User): Observable<UserResponse> {
        return this.http.patch<UserResponse>(this.url, data);
    }

    deleteMe(): Observable<UserResponse> {
        return this.http.delete<UserResponse>(this.url);
    }

    changeProfilePicture(data: FormData): Observable<UserResponse> {
        return this.http.post<UserResponse>(`${this.url}/profile-picture`, data);
    }

    deleteProfilePicture(): Observable<UserResponse> {
        return this.http.delete<UserResponse>(`${this.url}/profile-picture`);
    }
}
