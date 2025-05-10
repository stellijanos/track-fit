import { Component, effect, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthState } from '../../../core/states/auth.state';
import { Login } from '../../../core/models/auth.model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-login',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css', '../styles.css']
})
export class LoginComponent implements OnInit {

    form !: FormGroup;

    constructor(private fb: FormBuilder, private authState: AuthState, private router: Router) {
        effect(() => {
            console.log(authState.isLoggedIn());
            if (authState.isLoggedIn()) {
                this.router.navigate(['/']);
            }
        })
    }

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.form = this.fb.group({
            credential: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        if (!this.form.valid) return;
        this.authState.login(this.form.value as Login);
    }


}
