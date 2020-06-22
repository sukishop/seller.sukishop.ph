import { Component } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
    templateUrl: './sign-up.component.html'
})

export class SignUpComponent {

    signUpForm: FormGroup;

    constructor(private fb: FormBuilder, private router: Router, private authService: AuthenticationService) {
    }

    ngOnInit(): void {
        this.signUpForm = this.fb.group({
            email: [null, [Validators.required]],
            password: [null, [Validators.required]],
            checkPassword: [null, [Validators.required, this.confirmationValidator]],
            agree: [false]
        });
    }

    submitForm(): void {
        for (const i in this.signUpForm.controls) {
            this.signUpForm.controls[i].markAsDirty();
            this.signUpForm.controls[i].updateValueAndValidity();
        }

        if (this.signUpForm.valid) {
            this.authService.signUp(this.signUpForm.get('email').value, this.signUpForm.get('password').value);
        }

        //this.router.navigateByUrl('/authentication/register-business');
    }

    updateConfirmValidator(): void {
        Promise.resolve().then(() => this.signUpForm.controls.checkPassword.updateValueAndValidity());
    }

    confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if (control.value !== this.signUpForm.controls.password.value) {
            return { confirm: true, error: true };
        }
    }
}
