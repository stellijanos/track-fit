import { Injectable, signal, computed } from '@angular/core';
import { Entry } from '../models/entry.model';
import { EntryApiService } from '../services/entry-api.service';

@Injectable({ providedIn: 'root' })
export class EntryState {
    private _entry = signal<Entry | null>(null);
    readonly entry = computed(() => this._entry());

    constructor(private api: EntryApiService) { }

    loadEntry(date: string, force = false) {
        if (force || !this._entry()) {
            this.api.get(date).subscribe({
                next: (res) => {
                    this._entry.set(res.data.entries);
                },
                error: (err) => {
                    console.error(err.error.message);
                }
            });
        }
    }

    clearEntry() {
        this._entry.set(null);
    }
}
