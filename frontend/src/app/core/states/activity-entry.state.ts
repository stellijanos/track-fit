import { Injectable, signal, computed } from "@angular/core";
import { ActivityEntry, ActivityEntryRequest } from "../models/activity-entry.model";
import { ActivityEntryApiService } from "../services/activity-entry-api.service";

@Injectable({ providedIn: 'root' })
export class ActivityEntryState {
    private _entries = signal<ActivityEntry[]>([]);
    readonly entries = computed(() => this._entries());

    constructor(private api: ActivityEntryApiService) { }

    clearEntries() {
        this._entries.set([]);
    }

    loadEntries(date: string) {
        this.api.getAll(date).subscribe({
            next: (response) => {
                this._entries.set(response.data.activityEntries);
            },
            error: (err) => {
                console.error(err.error.message);
            }
        });
    }

    createEntry(date: string, data: ActivityEntryRequest) {
        this.api.create(date, data).subscribe({
            next: (response) => {
                this._entries.update(list => [...list, response.data.activityEntry]);
            },
            error: (err) => {
                console.error(err.error.message);
            }
        });
    }

    updateEntry(id: string, date: string, updatedData: ActivityEntry) {
        this.api.update(id, date, updatedData).subscribe({
            next: () => {
                this._entries.update(list => list.map(entry =>
                    entry.id === id ? { ...entry, ...updatedData } : entry
                ));
            },
            error: (err) => {
                console.error(err.error.message);
            }
        });
    }

    deleteEntry(id: string, date: string) {
        this.api.delete(id, date).subscribe({
            next: () => {
                this._entries.update(list => list.filter(entry => entry.id !== id));
            },
            error: (err) => {
                console.error(err.error.message);
            }
        });
    }
}
