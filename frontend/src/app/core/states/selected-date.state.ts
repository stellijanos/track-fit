import { Injectable, signal, computed } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class SelectedDateState {
    private _date = signal<string>(new Date().toISOString().split('T')[0]);
    readonly date = computed(() => this._date());

    setDate(date: Date) {
        this._date.set(date.toISOString().split('T')[0]);
    }
}
