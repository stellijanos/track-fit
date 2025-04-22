import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { WaterEntryRequest, WaterIntake } from '../models/water-intake.model';
import { Observable } from 'rxjs';

type WaterIntakeResponse = ApiResponse<'waterIntake', WaterIntake>;
type EmptyResponse = ApiResponse<'', undefined>;


@Injectable({
    providedIn: 'root'
})
export class WaterIntakeApiService {

    private url = `${environment.apiUrl}/users/me/entries`;

    constructor(private http: HttpClient) { }

    get(date: String): Observable<WaterIntakeResponse> {
        return this.http.get<WaterIntakeResponse>(`${this.url}/${date}/water-intake`);
    }

    create(date: string, data: WaterEntryRequest): Observable<WaterIntakeResponse> {
        return this.http.post<WaterIntakeResponse>(`${this.url}/${date}/water-intake`, data);
    }

    delete(entryId: string, date: string): Observable<EmptyResponse> {
        return this.http.delete<EmptyResponse>(`${this.url}/${date}/water-intake/${entryId}`);
    }
}
