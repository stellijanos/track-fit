import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Entry } from '../models/entry.model';
import { Observable } from 'rxjs';

type EntryResponse = ApiResponse<'entries', Entry>;


@Injectable({
    providedIn: 'root'
})
export class EntryApiService {

    private url = `${environment.apiUrl}/users/me/entries`;

    constructor(private http: HttpClient) { }

    get(date: String): Observable<EntryResponse> {
        return this.http.get<EntryResponse>(`${this.url}/${date}`);
    }

}
