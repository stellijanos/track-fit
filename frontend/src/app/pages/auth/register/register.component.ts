import { Component, effect } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthState } from '../../../core/states/auth.state';
import { matchValidator } from '../../../core/validators/password-match.validator';
import { Register } from '../../../core/models/auth.model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-register',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css', '../styles.css']
})
export class RegisterComponent {

    form !: FormGroup;
    showPassword = false;


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
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            birthDate: ['', Validators.required],
            password: ['', Validators.required],
            passwordConfirm: ['', Validators.required],
            gender: ['', [Validators.required, Validators.pattern(/^(male|female|other)$/)]],
        }, {
            validators: matchValidator('password', 'passwordConfirm')
        });
    }

    onSubmit() {
        if (!this.form.valid) return;
        this.authState.register(this.form.value as Register);
    }


    togglePasswordVisibility(): void {
        this.showPassword = !this.showPassword;
    }
}
