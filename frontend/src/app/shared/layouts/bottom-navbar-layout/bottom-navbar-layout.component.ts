import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BottomNavbarComponent } from "../../components/bottom-navbar/bottom-navbar.component";

@Component({
    selector: 'app-bottom-navbar-layout',
    imports: [RouterModule, BottomNavbarComponent],
    templateUrl: './bottom-navbar-layout.component.html',
    styleUrl: './bottom-navbar-layout.component.css'
})
export class BottomNavbarLayoutComponent {

}
