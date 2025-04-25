import { Injectable, signal, computed } from '@angular/core';
import { CaloricTarget, CaloricTargetRequest } from '../models/caloric-target.model';
import { CaloricTargetApiService } from '../services/caloric-target-api.service';

@Injectable({ providedIn: 'root' })
export class CaloricTargetState {
    private _targets = signal<CaloricTarget[]>([]);
    readonly targets = computed(() => this._targets());

    constructor(private api: CaloricTargetApiService) { }

    clearTargets() {
        this._targets.set([]);
    }

    loadTargets(force = false) {
        if (force || this._targets().length === 0) {
            this.api.getAll().subscribe({
                next: (res) => {
                    this._targets.set(res.data.caloricTargets);
                }
            });
        }
    }

    createTarget(data: CaloricTargetRequest) {
        this.api.create(data).subscribe({
            next: (res) => {
                this._targets.update(list => [...list, res.data.caloricTarget]);
            }
        });
    }

    deleteTarget(id: string) {
        this.api.delete(id).subscribe({
            next: (res) => {
                this._targets.update(list => list.filter(t => t.id !== id));
            }
        });
    }
}
