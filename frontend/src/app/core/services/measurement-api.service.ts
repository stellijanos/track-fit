import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { Measurement } from '../models/measurement.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

type MeasurementResponse = ApiResponse<'measurement', Measurement>;
type MeasurementsResponse = ApiResponse<'measurements', Measurement[]>;
type EmptyResponse = ApiResponse<'', undefined>;

@Injectable({
    providedIn: 'root'
})
export class MeasurementApiService {

    private url = `${environment.apiUrl}/users/me/measurements`;

    constructor(private http: HttpClient) { }


    createMeasurement(data: Omit<Measurement, 'id' | 'createdAt' | 'updatedAt'>): Observable<MeasurementResponse> {
        return this.http.post<MeasurementResponse>(this.url, data);
    }
    getMeasurements(): Observable<MeasurementsResponse> {
        return this.http.get<MeasurementsResponse>(this.url);
    }

    updateMeasurement(id: string, data: Omit<Measurement, 'id' | 'createdAt' | 'updatedAt'>): Observable<MeasurementResponse> {
        return this.http.patch<MeasurementResponse>(`${this.url}/${id}`, data);
    }

    deleteMeasurement(id: string): Observable<EmptyResponse> {
        return this.http.delete<EmptyResponse>(`${this.url}/${id}`);
    }

}
