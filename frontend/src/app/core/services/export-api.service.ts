import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Observable } from 'rxjs';

type EmptyResponse = ApiResponse<'', undefined>;

@Injectable({
    providedIn: 'root'
})
export class ExportApiService {

    private url = `${environment.apiUrl}/users/me/exports`;

    constructor(private http: HttpClient) { }

    pdf(mealPlanId: string): Observable<EmptyResponse> {
        return this.http.get<EmptyResponse>(`${this.url}/pdf/meal-plans/${mealPlanId}`);
    }

    csv(subject: string, from?: string, until?: string): Observable<EmptyResponse> {
        let url = `${this.url}/csv/${subject}`
        if (from && until) {
            url = `${url}?from=${from}&until=${until}`
        }
        return this.http.get<EmptyResponse>(url);
    }

}
