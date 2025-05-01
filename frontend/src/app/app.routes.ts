import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { ChangePasswordFormComponent } from './components/forms/change-password-form/change-password-form.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { TopNavbarLayoutComponent } from './shared/layouts/top-navbar-layout/top-navbar-layout.component';
import { BottomNavbarLayoutComponent } from './shared/layouts/bottom-navbar-layout/bottom-navbar-layout.component';
import { AccountComponent } from './pages/user/account/account.component';
import { MyProfileFormComponent } from './components/forms/my-profile-form/my-profile-form.component';
import { MeasurementFormComponent } from './components/forms/measurement-form/measurement-form.component';
import { MeasurementListComponent } from './components/lists/measurement-list/measurement-list.component';
import { CaloricTargetFormComponent } from './components/forms/caloric-target-form/caloric-target-form.component';
import { CaloricTargetListComponent } from './components/lists/caloric-target-list/caloric-target-list.component';
import { MealPlanListComponent } from './components/lists/meal-plan-list/meal-plan-list.component';
import { MealPlanFormComponent } from './components/forms/meal-plan-form/meal-plan-form.component';
import { MealPlanPreviewComponent } from './components/previews/meal-plan-preview/meal-plan-preview.component';
import { HomeComponent } from './pages/user/home/home.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    {
        path: '', component: BottomNavbarLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'account', component: AccountComponent }
        ]
    },
    {
        path: '', component: TopNavbarLayoutComponent,
        children: [
            { path: 'account/me', component: MyProfileFormComponent },
            { path: 'account/change-password', component: ChangePasswordFormComponent },
            { path: 'caloric-targets', component: CaloricTargetListComponent },
            { path: 'caloric-targets/new', component: CaloricTargetFormComponent },
            { path: 'meal-plans', component: MealPlanListComponent },
            { path: 'meal-plans/new', component: MealPlanFormComponent },
            { path: 'meal-plans/:id', component: MealPlanPreviewComponent },
            { path: 'measurements', component: MeasurementListComponent },
            { path: 'measurements/new', component: MeasurementFormComponent },
            { path: 'measurements/:id/edit', component: MeasurementFormComponent },
        ]
    },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: 'not-found' }
];
