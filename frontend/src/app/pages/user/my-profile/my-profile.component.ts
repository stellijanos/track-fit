import { Component } from '@angular/core';
import { MyProfileFormComponent } from "../../../components/forms/my-profile-form/my-profile-form.component";
import { TopNavbarComponent } from "../../../shared/components/top-navbar/top-navbar.component";

@Component({
    selector: 'app-my-profile',
    imports: [MyProfileFormComponent, TopNavbarComponent],
    templateUrl: './my-profile.component.html',
    styleUrl: './my-profile.component.css'
})
export class MyProfileComponent {

}
