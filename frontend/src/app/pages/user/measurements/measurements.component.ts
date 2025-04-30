import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { TopNavbarComponent } from "../../../shared/components/top-navbar/top-navbar.component";
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';

type Mode = 'read' | 'create' | 'update';

@Component({
    selector: 'app-measurements',
    standalone: true,
    imports: [CommonModule, TopNavbarComponent, RouterOutlet],
    templateUrl: './measurements.component.html',
    styleUrls: ['./measurements.component.css'],
})
export class MeasurementsComponent {

    topNavBarContent = {
        pageTitle: '',
        backLink: '',
    };

    constructor(private router: Router, private route: ActivatedRoute) {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                const currentRoute = this.router.url;

                if (currentRoute.includes('/account/measurements') && (currentRoute.includes('/new') || currentRoute.includes('/edit'))) {
                    this.topNavBarContent = {
                        pageTitle: 'Add Measurement',
                        backLink: '/account/measurements',
                    };
                } else if (currentRoute.includes('/account/measurements')) {
                    this.topNavBarContent = {
                        pageTitle: 'Measurements',
                        backLink: '/account'
                    };
                }
            });
    }

}
