import { inject } from '@angular/core';
import { CanActivateChildFn } from '@angular/router';
import { UserState } from '../states/user.state';

export const authGuard: CanActivateChildFn = (childRoute, state) => {

    const userState = inject(UserState);
    userState.getMe();
    return true;
};
