import { Component } from '@angular/core';
import { TopNavbarComponent } from "../../../shared/components/top-navbar/top-navbar.component";
import { ChangePasswordFormComponent } from "../../../components/forms/change-password-form/change-password-form.component";

@Component({
  selector: 'app-change-password',
  imports: [TopNavbarComponent, ChangePasswordFormComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {

}
