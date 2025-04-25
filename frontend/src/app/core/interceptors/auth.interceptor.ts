import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { GlobalMessageState } from '../states/global-message.state';
import { inject } from '@angular/core';
import { ApiResponse } from '../models/api-response.model';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

    const globalMessageState = inject(GlobalMessageState);

    const authReq = req.clone({
        withCredentials: true
    })
    return next(authReq).pipe(
        tap(event => {
            if (event instanceof HttpResponse) {
                const eventBody = event.body as ApiResponse<'', undefined>;
                globalMessageState.show('success', eventBody.message);
            }
        }),
        catchError(res => {
            globalMessageState.show('error', res.error.message || 'An unknown error occured.');
            return throwError(() => res);
        })
    );
};
