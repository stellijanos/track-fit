import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { MyProfileComponent } from './pages/user/my-profile/my-profile.component';
import { AccountComponent } from './pages/user/account/account.component';
import { ChangePasswordComponent } from './pages/auth/change-password/change-password.component';
import { MeasurementsComponent } from './pages/user/measurements/measurements.component';
import { MeasurementFormComponent } from './components/forms/measurement-form/measurement-form.component';
import { MeasurementListComponent } from './components/lists/measurement-list/measurement-list.component';
import { NavbarLayoutComponent } from './shared/layouts/navbar-layout/navbar-layout.component';
import { CaloricTargetFormComponent } from './components/forms/caloric-target-form/caloric-target-form.component';
import { CaloricTargetListComponent } from './components/lists/caloric-target-list/caloric-target-list.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'account', component: AccountComponent },
    { path: 'account/me', component: MyProfileComponent },
    {
        path: 'measurements', component: MeasurementsComponent,
        children: [
            { path: '', component: MeasurementListComponent },
            { path: 'new', component: MeasurementFormComponent },
            { path: ':id/edit', component: MeasurementFormComponent },
        ]
    },
    {
        path: 'caloric-targets', component: NavbarLayoutComponent,
        children: [
            { path: '', component: CaloricTargetListComponent },
            { path: 'new', component: CaloricTargetFormComponent },
            { path: ':id/edit', component: CaloricTargetFormComponent },
        ]
    },
    { path: 'account/change-password', component: ChangePasswordComponent },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: 'not-found' }
];
