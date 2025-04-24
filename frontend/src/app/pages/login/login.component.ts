import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthState } from '../../core/states/auth.state';
import { Router } from '@angular/router';
import { Login } from '../../core/models/auth.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

    form !: FormGroup;

    constructor(private router: Router, private fb: FormBuilder, private authState: AuthState) {

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
