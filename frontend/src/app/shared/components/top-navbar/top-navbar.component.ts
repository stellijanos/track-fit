import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-top-navbar',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './top-navbar.component.html',
    styleUrls: ['./top-navbar.component.css'],
})
export class TopNavbarComponent {
    @Input() pageTitle: string = '';
    @Input() backLink: string = '/';
}
