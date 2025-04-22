import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CaloricTarget } from '../models/caloric-target.model';
import { ApiResponse } from '../models/api-response.model';
import { Observable } from 'rxjs';

type CaloricTargetResponse = ApiResponse<'caloricTarget', CaloricTarget>;
type CaloricTargetsResponse = ApiResponse<'caloricTargets', CaloricTarget[]>;
type EmptyResponse = ApiResponse<'', undefined>;


@Injectable({
    providedIn: 'root'
})
export class CaloricTargetApiService {

    private url = `${environment.apiUrl}/users/me/caloric-targets`;

    constructor(private http: HttpClient) { }


    create(data: CaloricTarget): Observable<CaloricTargetResponse> {
        return this.http.post<CaloricTargetResponse>(this.url, data);
    }

    getAll(): Observable<CaloricTargetsResponse> {
        return this.http.get<CaloricTargetsResponse>(this.url);
    }

    delete(id: string): Observable<EmptyResponse> {
        return this.http.delete<EmptyResponse>(`${this.url}/${id}`);
    }
}
