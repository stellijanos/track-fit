import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { WaterIntake } from '../models/water-intake.model';
import { Observable } from 'rxjs';

type WaterIntakeResponse = ApiResponse<'mealEntry', WaterIntake>;
type WaterIntakesResponse = ApiResponse<'mealEntries', WaterIntake[]>;
type EmptyResponse = ApiResponse<'', undefined>;


@Injectable({
    providedIn: 'root'
})
export class WaterIntakeApiService {

    private url = `${environment.apiUrl}/users/me/entries`;

    constructor(private http: HttpClient) { }

    get(date: String): Observable<WaterIntakesResponse> {
        return this.http.get<WaterIntakesResponse>(`${this.url}/${date}/water-intake`);
    }

    create(date: string, data: WaterIntake): Observable<WaterIntakeResponse> {
        return this.http.post<WaterIntakeResponse>(`${this.url}/${date}/water-intake`, data);
    }

    delete(entryId: string, date: string): Observable<EmptyResponse> {
        return this.http.delete<EmptyResponse>(`${this.url}/${date}/water-intake/${entryId}`);
    }
}
