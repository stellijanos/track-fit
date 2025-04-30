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
                        this.topNavBarContent = {
                            pageTitle: 'Add Target',
                            backLink: '/caloric-targets',
                            rightText: '',
                            rightLink: '',
                        };
                    } else if (currentRoute.includes('/edit')) {
                        this.topNavBarContent = {
                            pageTitle: 'Edit Target',
                            backLink: '/caloric-targets',
                            rightText: '',
                            rightLink: '',
                        };
                    } else {
                        this.topNavBarContent = {
                            pageTitle: 'Caloric Targets',
                            backLink: '/account',
                            rightText: 'Add new',
                            rightLink: '/caloric-targets/new',
                        };
                    }
                }
            });
    }
}
