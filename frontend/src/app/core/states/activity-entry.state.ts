import { Injectable, signal, computed } from "@angular/core";
import { ActivityEntry, ActivityEntryRequest, ActivityEntryUpdateRequest } from "../models/activity-entry.model";
import { ActivityEntryApiService } from "../services/activity-entry-api.service";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class ActivityEntryState {
    private _entries = signal<ActivityEntry[]>([]);
    readonly entries = computed(() => this._entries());

    constructor(private api: ActivityEntryApiService, private router: Router) { }

    clearEntries() {
        this._entries.set([]);
    }

    loadEntries(date: string) {
        this.api.getAll(date).subscribe({
            next: (res) => {
                this._entries.set(res.data.activityEntries);
            }
        });
    }

    createEntry(date: string, data: ActivityEntryRequest) {
        this.api.create(date, data).subscribe({
            next: (res) => {
                this._entries.update(list => [...list, res.data.activityEntry]);
                this.navigateTo('/');
            }
        });
    }

    updateEntry(id: string, date: string, updatedData: ActivityEntryUpdateRequest) {
        this.api.update(id, date, updatedData).subscribe({
            next: (res) => {
                this._entries.update(list => list.map(entry =>
                    entry.id === id ? res.data.activityEntry : entry
                ));
            }
        });
    }

    deleteEntry(id: string, date: string) {
        this.api.delete(id, date).subscribe({
            next: () => {
                this._entries.update(list => list.filter(entry => entry.id !== id));
            }
        });
    }

    navigateTo(route: string) {
        this.router.navigate([route]);
    }
}
