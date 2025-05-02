import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { TopNavbarComponent } from '../../components/top-navbar/top-navbar.component';
import { ExportApiService } from '../../../core/services/export-api.service';

@Component({
    selector: 'app-top-navbar-layout',
    imports: [RouterModule, TopNavbarComponent],
    templateUrl: './top-navbar-layout.component.html',
    styleUrl: './top-navbar-layout.component.css'
})
export class TopNavbarLayoutComponent {

    topNavBarContent = {
        pageTitle: '',
        backLink: '',
        rightText: '',
        rightFunc: () => { },
    };

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private exportService: ExportApiService
    ) {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                const currentRoute = this.router.url;

                if (currentRoute.includes('/caloric-targets')) {

                    if (currentRoute.includes('/new')) {
                        this.setTopNavbarContent('Add Target', '/caloric-targets');

                    } else if (currentRoute.includes('/edit')) {
                        this.setTopNavbarContent('Edit Target', '/caloric-targets');

                    } else {
                        this.setTopNavbarContent('Caloric Targets', '/account', 'Add new', () => { this.naviagetTo('/caloric-targets/new') });
                    }

                } else if (currentRoute.includes('/meal-plans')) {

                    if (currentRoute.includes('/new')) {
                        this.setTopNavbarContent('Genearte Meal Plan', '/meal-plans');

                    } else if (!currentRoute.endsWith('/meal-plans')) {
                        this.setTopNavbarContent('Preview Meal Plan', '/meal-plans');

                    } else {
                        this.setTopNavbarContent('Meal plans', '/account', 'Add new', () => { this.naviagetTo('/meal-plans/new') });
                    }
                } else if (currentRoute.includes('/measurements')) {

                    if (currentRoute.includes('/new')) {
                        this.setTopNavbarContent('Add Measurement', '/measurements');

                    } else if (currentRoute.includes('/edit')) {
                        this.setTopNavbarContent('Edit Measurement', '/measurements');

                    } else {
                        this.setTopNavbarContent('Measurements', '/account', 'Add new', () => { this.naviagetTo('/measurements/new') });
                    }
                }
            });
    }

    naviagetTo(route: string) {
        this.router.navigate([route]);
    }

    setTopNavbarContent(pageTitle: string, backLink: string, rightText: string = '', rightFunc: () => void = () => { }) {
        this.topNavBarContent = {
            pageTitle,
            backLink,
            rightText,
            rightFunc,
        }
    }
}
