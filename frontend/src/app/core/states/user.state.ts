import { computed, effect, Injectable, signal } from "@angular/core";
import { UserApiService } from "../services/user-api.service";
import { User } from "../models/user.model";
import { defaultUser } from "../models/model-defaults";
import { AuthState } from "./auth.state";


@Injectable({ providedIn: 'root' })
export class UserState {

    private _user = signal<User>(defaultUser());

    readonly user = computed(() => this._user())

    constructor(private apiService: UserApiService, private authState: AuthState) {
        effect(() => {
            if (this.authState.isLoggedIn()) {
                this.getMe()
            } else {
                this.clearUser();
            }
        })
    }

    private setUser(user: User) {
        this._user.set(user);
    }

    private clearUser() {
        this._user.set(defaultUser());
    }

    getMe() {
        this.apiService.getMe().subscribe({
            next: (response) => {
                this.setUser(response.data.user);
            },
            error: (response) => {
                console.error(response.error.message);
            }
        })
    }

    updateMe(data: User) {
        this.apiService.updateMe(data).subscribe({
            next: (response) => {
                this.setUser(response.data.user);
            },
            error: (response) => {
                console.error(response.error.message);
            }
        })
    }

    deleteMe() {
        this.apiService.deleteMe().subscribe({
            next: () => {
                this.clearUser();
            },
            error: (response) => {
                console.error(response.error.message);
            }
        })
    }

    changeProfilePicture(data: FormData) {
        this.apiService.changeProfilePicture(data).subscribe({
            next: (response) => {
                this.setUser(response.data.user);
            },
            error: (response) => {
                console.error(response.error.message);
            }
        })
    }

    deleteProfilePicture() {
        this.apiService.deleteMe().subscribe({
            next: (response) => {
                this.setUser(response.data.user);
            },
            error: (response) => {
                console.error(response.error.message);
            }
        })
    }
}
