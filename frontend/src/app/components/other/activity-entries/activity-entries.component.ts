import { Component, effect } from '@angular/core';
import { ActivityEntry } from '../../../core/models/activity-entry.model';
import { defaultActivityEntry } from '../../../core/models/model-defaults';
import { ActivityEntryState } from '../../../core/states/activity-entry.state';
import { SelectedDateState } from '../../../core/states/selected-date.state';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-activity-entries',
    imports: [CommonModule, RouterModule],
    templateUrl: './activity-entries.component.html',
    styleUrl: './activity-entries.component.css'
})
export class ActivityEntriesComponent {

    date = '';
    deleteId: string | null = null;
    activityEntries: ActivityEntry[] = [];
    selectedEntry: ActivityEntry = defaultActivityEntry();

    constructor(
        private activityEntryState: ActivityEntryState,
        private selectedDateState: SelectedDateState
    ) {
        effect(() => {
            this.date = this.selectedDateState.date();
            this.activityEntries = this.activityEntryState.entries();
        });
        console.log(this.activityEntries);
    }

    prepareDelete(activityId: string) {
        this.deleteId = activityId;
    }

    cancelDelete() {
        this.deleteId = null;
    }

    confirmDelete() {
        if (!this.deleteId) return;
        this.activityEntryState.deleteEntry(this.deleteId, this.date);
        this.deleteId = null;
    }

}
