import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { ActivityEntry, ActivityEntryRequest, ActivityEntryUpdateRequest } from '../models/activity-entry.model';
import { Observable } from 'rxjs';

type ActivityEntryResponse = ApiResponse<'activityEntry', ActivityEntry>;
type ActivityEntriesResponse = ApiResponse<'activityEntries', ActivityEntry[]>;
type EmptyResponse = ApiResponse<'', undefined>;


@Injectable({
    providedIn: 'root'
})
export class ActivityEntryApiService {

    private url = `${environment.apiUrl}/users/me/entries`;

    constructor(private http: HttpClient) { }

    create(date: string, data: ActivityEntryRequest): Observable<ActivityEntryResponse> {
        return this.http.post<ActivityEntryResponse>(`${this.url}/${date}/activities`, data);
    }

    getAll(date: String): Observable<ActivityEntriesResponse> {
        return this.http.get<ActivityEntriesResponse>(`${this.url}/${date}/activities`);
    }

    update(id: string, date: string, data: ActivityEntryUpdateRequest): Observable<ActivityEntryResponse> {
        return this.http.patch<ActivityEntryResponse>(`${this.url}/${date}/activities/${id}`, data);
    }

    delete(id: string, date: string): Observable<EmptyResponse> {
        return this.http.delete<EmptyResponse>(`${this.url}/${date}/activities/${id}`);
    }
}
