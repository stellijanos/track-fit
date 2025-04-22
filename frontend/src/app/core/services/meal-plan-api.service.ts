import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../models/api-response.model';
import { MealPlan, MealPlanRequest } from '../models/meal-plan.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

type MealPlanResponse = ApiResponse<'mealPlan', MealPlan>;
type MealPlansResponse = ApiResponse<'mealPlans', MealPlan[]>;
type EmptyResponse = ApiResponse<'', undefined>;

@Injectable({
    providedIn: 'root'
})
export class MealPlanApiService {

    private url = `${environment.apiUrl}/users/me/meal-plans`;

    constructor(private http: HttpClient) { }


    create(data: MealPlanRequest): Observable<MealPlanResponse> {
        return this.http.post<MealPlanResponse>(this.url, data);
    }

    getAllPreviews(): Observable<MealPlansResponse> {
        return this.http.get<MealPlansResponse>(this.url);
    }

    get(id: string): Observable<MealPlanResponse> {
        return this.http.get<MealPlanResponse>(`${this.url}/${id}`);
    }

    delete(id: string): Observable<EmptyResponse> {
        return this.http.delete<EmptyResponse>(`${this.url}/${id}`);
    }
}
