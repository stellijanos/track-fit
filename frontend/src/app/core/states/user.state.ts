import { computed, effect, Injectable, signal } from "@angular/core";
import { UserApiService } from "../services/user-api.service";
import { User } from "../models/user.model";
import { defaultUser } from "../models/model-defaults";

@Injectable({ providedIn: 'root' })
export class UserState {

    private _user = signal(defaultUser());
    private _userReady = signal(false);

    readonly user = computed(() => this._user())
    readonly userReady = computed(() => this._userReady());

    constructor(private apiService: UserApiService) {
    }

    private setUser(user: User) {
        this._user.set(user);
    }

    private clearUser() {
        this._user.set(defaultUser());
    }

    getMe() {
        this.apiService.getMe().subscribe({
            next: (res) => {
                this.setUser(res.data.user);
                this._userReady.set(true);
            },
            error: () => {
                this._userReady.set(true);
            }
        })
    }

    updateMe(data: User) {
        this.apiService.updateMe(data).subscribe({
            next: (res) => {
                this.setUser(res.data.user);
            }
        })
    }

    deleteMe() {
        this.apiService.deleteMe().subscribe({
            next: () => {
                this.clearUser();
            },
        })
    }

    changeProfilePicture(data: FormData) {
        this.apiService.changeProfilePicture(data).subscribe({
            next: (res) => {
                this.setUser(res.data.user);
            }
        })
    }

    deleteProfilePicture() {
        this.apiService.deleteMe().subscribe({
            next: (res) => {
                this.setUser(res.data.user);
            }
        })
    }
}
