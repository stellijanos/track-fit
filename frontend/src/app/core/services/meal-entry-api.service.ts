import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { MealEntry, MealEntryRequest, MealEntryUpdateRequest } from '../models/meal-entry.model';
import { Observable } from 'rxjs';

type MealEntryResponse = ApiResponse<'mealEntry', MealEntry>;
type MealEntriesResponse = ApiResponse<'mealEntries', MealEntry[]>;
type EmptyResponse = ApiResponse<'', undefined>;


@Injectable({
    providedIn: 'root'
})
export class MealEntryApiService {

    private url = `${environment.apiUrl}/users/me/entries`;

    constructor(private http: HttpClient) { }

    create(date: string, data: MealEntryRequest): Observable<MealEntriesResponse> {
        return this.http.post<MealEntriesResponse>(`${this.url}/${date}/meals`, data);
    }

    getAll(date: String): Observable<MealEntriesResponse> {
        return this.http.get<MealEntriesResponse>(`${this.url}/${date}/meals`);
    }

    update(id: string, date: string, data: MealEntryUpdateRequest): Observable<EmptyResponse> {
        return this.http.patch<EmptyResponse>(`${this.url}/${date}/meals/${id}`, data);
    }

    delete(id: string, date: string): Observable<EmptyResponse> {
        return this.http.delete<EmptyResponse>(`${this.url}/${date}/meals/${id}`);
    }
}
