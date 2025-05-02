import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ExportApiService {

    private url = `${environment.apiUrl}/users/me/exports`;

    constructor(private http: HttpClient) { }

    getPdf(mealPlanId: string): Observable<Blob> {
        return this.http.get(`${this.url}/pdf/meal-plans/${mealPlanId}`, {
            responseType: 'blob'
        });
    }

    getCsv(subject: string, from?: string, until?: string): Observable<Blob> {
        let url = `${this.url}/csv/${subject}`;
        if (from && until) {
            url = `${url}?from=${from}&until=${until}`;
        }
        return this.http.get(url, {
            responseType: 'blob'
        });
    }

}
