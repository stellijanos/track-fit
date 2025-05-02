import { Component, effect } from '@angular/core';
import { ActivityEntry } from '../../../core/models/activity-entry.model';
import { defaultActivityEntry } from '../../../core/models/model-defaults';
import { ActivityEntryState } from '../../../core/states/activity-entry.state';
import { SelectedDateState } from '../../../core/states/selected-date.state';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-activity-entries',
    imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
    templateUrl: './activity-entries.component.html',
    styleUrl: './activity-entries.component.css'
})
export class ActivityEntriesComponent {

    date = '';
    deleteId: string | null = null;
    activityEntries: ActivityEntry[] = [];
    selectedEntry: ActivityEntry = defaultActivityEntry();

    editId: string | null = null;
    editName = '';
    editDuration = 0;



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


    startEdit(entry: ActivityEntry) {
        this.editId = entry.id;
        this.editName = entry.name;
        this.editDuration = entry.durationInM;
    }

    cancelEdit() {
        this.editId = null;
        this.editName = '';
        this.editDuration = 0;
    }

    onUpdateSave(id: string, updatedName: string, updatedDuration: number) {
        const entry = this.activityEntries.find(e => e.id === id);
        if (!entry) return;

        const updatedEntry = {
            name: updatedName,
            durationInM: updatedDuration
        };

        this.activityEntryState.updateEntry(id, this.date, updatedEntry);
        this.cancelEdit();
    }



}
