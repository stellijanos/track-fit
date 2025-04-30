import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-bottom-navbar',
    imports: [CommonModule, RouterModule],
    templateUrl: './bottom-navbar.component.html',
    styleUrls: ['./bottom-navbar.component.css']
})
export class BottomNavbarComponent {
    quickActionOpen = false;

    toggleQuickAction() {
        this.quickActionOpen = !this.quickActionOpen;
    }

    @HostListener('document:click', ['$event'])
    closeOnClickOutside(event: MouseEvent) {
        const target = event.target as HTMLElement;
        if (!target.closest('.quick-action-container')) {
            this.quickActionOpen = false;
        }
    }
}
