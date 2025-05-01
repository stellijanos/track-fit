import { Component } from '@angular/core';
import { TopNavbarComponent } from "../../components/top-navbar/top-navbar.component";
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
    selector: 'app-navbar-layout',
    imports: [RouterOutlet, TopNavbarComponent],
    templateUrl: './navbar-layout.component.html',
    styleUrl: './navbar-layout.component.css'
})
export class NavbarLayoutComponent {

    topNavBarContent = {
        pageTitle: '',
        backLink: '',
        rightText: '',
        rightLink: '',
    };

    constructor(private router: Router, private route: ActivatedRoute) {
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
                        this.setTopNavbarContent('Caloric Targets', '/account', 'Add new', '/caloric-targets/new');
                    }
                } else if (currentRoute.includes('/meal-plans')) {

                    if (currentRoute.includes('/new')) {
                        this.setTopNavbarContent('Genearte Meal Plan', '/meal-plans');
                    } else {
                        this.setTopNavbarContent('Meals', '/account', 'Add bew', '/meal-plans/new');
                    }
                }
            });
    }


    setTopNavbarContent(pageTitle: string, backLink: string, rightText: string = '', rightLink: string = '') {
        this.topNavBarContent = {
            pageTitle,
            backLink,
            rightText,
            rightLink,
        }
    }
}
