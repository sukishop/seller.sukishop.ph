import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthenticationService } from '../../shared/services/authentication.service'

@Component({
    templateUrl: './login.component.html'
})

export class LoginComponent {

    constructor(private fb: FormBuilder, private router: Router, private authService: AuthenticationService) {
    }

    loginForm: FormGroup;

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            email: [null, [Validators.email, Validators.required]],
            password: [null, [Validators.required]]
        });
    }

    submitForm(): void {
        // this.router.navigateByUrl('/dashboard');
        for (const i in this.loginForm.controls) {
            this.loginForm.controls[i].markAsDirty();
            this.loginForm.controls[i].updateValueAndValidity();
        }

        if (this.loginForm.valid) {
            this.authService.SignIn(this.loginForm.get('email').value, this.loginForm.get('password').value);
        }
    }

    socialLogin(type) {
        if (type === 'google') {
            return this.authService.GoogleAuth();
        }

        if (type === 'facebook') {
            return this.authService.FacebookAuth();
        }
    }
}
