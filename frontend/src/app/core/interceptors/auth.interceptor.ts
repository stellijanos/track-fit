import { HttpErrorResponse, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, finalize, Subject, switchMap, tap, throwError } from 'rxjs';
import { GlobalMessageState } from '../states/global-message.state';
import { inject } from '@angular/core';
import { ApiResponse } from '../models/api-response.model';
import { AuthState } from '../states/auth.state';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

    const globalMessageState = inject(GlobalMessageState);
    const authState = inject(AuthState);


    const shouldNotify = () => {
        console.log(req.method, req.url);
        return !authState.isTokenRefreshing() && req.method !== 'GET';
    }

    const isProtectedRoute = () => !req.url.includes('/auth') || req.url.includes('/change');

    const cloneRequest = () => req.clone({
        withCredentials: true,
        ...(authState.isLoggedIn() && isProtectedRoute()
            ? { headers: req.headers.append('Authorization', `Bearer ${authState.accessToken()}`) }
            : {})
    });

    if (!isProtectedRoute()) return next(cloneRequest()).pipe(
        tap(event => {
            if (event instanceof HttpResponse) {
                const eventBody = event.body as ApiResponse<'', undefined>;
                if (shouldNotify()) {
                    globalMessageState.show('success', eventBody.message);
                }
            }
        }),
        catchError((error: HttpErrorResponse) => {
            if (shouldNotify()) {
                globalMessageState.show('error', error.error.message || 'An unknown error occured.');
            }
            return throwError(() => error);
        }),
    );

    const handle401Error = () => {
        return authState.refreshToken().pipe(
            switchMap(() => {
                return next(cloneRequest());
            })
        );
    }

    return next(cloneRequest()).pipe(
        tap(event => {
            if (event instanceof HttpResponse) {
                const eventBody = event.body as ApiResponse<'', undefined>;
                if (shouldNotify()) {
                    globalMessageState.show('success', eventBody?.message || 'Successfully deleted.');
                }
            }
        }),
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401 && !authState.isTokenRefreshing()) {
                return handle401Error();
            }

            globalMessageState.show('error', error.error.message || 'An unknown error occured.');

            return throwError(() => error);
        }),
    );
};
