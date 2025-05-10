import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthState } from '../states/auth.state';
import { catchError, map, of, pipe } from 'rxjs';

export const authGuard: CanActivateChildFn = (childRoute, state) => {

    const authState = inject(AuthState);
    const router = inject(Router);

    if (authState.isLoggedIn()) return true;

    return authState.refreshToken().pipe(
        map(() => {
            return authState.isLoggedIn()
                ? true
                : router.createUrlTree(['/login']);
        }),
        catchError(() => {
            return of(router.createUrlTree(['/login']));
        })
    );

};
