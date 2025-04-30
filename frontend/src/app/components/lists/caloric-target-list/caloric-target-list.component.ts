import { Component, effect } from '@angular/core';
import { CaloricTarget } from '../../../core/models/caloric-target.model';
import { CaloricTargetState } from '../../../core/states/caloric-target.state';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-caloric-target-list',
    imports: [CommonModule],
    templateUrl: './caloric-target-list.component.html',
    styleUrl: './caloric-target-list.component.css'
})
export class CaloricTargetListComponent {
    caloricTargets: CaloricTarget[] = [];
    deleteId: string | null = null;

    constructor(
        private caloricTargetState: CaloricTargetState,
        private router: Router
    ) {
        effect(() => {
            this.caloricTargets = this.caloricTargetState
                .targets()
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        });
    }


    confirmDelete(id: string) {
        this.deleteId = id;
    }

    cancelDelete() {
        this.deleteId = null;
    }

    onDelete() {
        if (!this.deleteId) return;
        this.caloricTargetState.deleteTarget(this.deleteId);
        this.deleteId = null;
    }
}
