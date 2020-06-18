import { Component } from '@angular/core'
import { FormBuilder, FormControl, FormGroup,  Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
    templateUrl: './sign-up.component.html'
})

export class SignUpComponent {
 
    signUpForm: FormGroup;

    submitForm(): void {
        /*for (const i in this.signUpForm.controls) {
            this.signUpForm.controls[ i ].markAsDirty();
            this.signUpForm.controls[ i ].updateValueAndValidity();
        }*/ 
        this.router.navigateByUrl('/authentication/register-business');
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

    constructor(private fb: FormBuilder, private router: Router) {
    }

    ngOnInit(): void {
        this.signUpForm = this.fb.group({
            userName         : [ null, [ Validators.required ] ],
            email            : [ null, [ Validators.required ] ],
            password         : [ null, [ Validators.required ] ],
            checkPassword    : [ null, [ Validators.required, this.confirmationValidator ] ],
            agree            : [ false ]
        });
    } 
}    