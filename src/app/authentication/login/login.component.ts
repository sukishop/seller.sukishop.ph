import { Component } from '@angular/core'
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
    templateUrl: './login.component.html'
})

export class LoginComponent {
    loginForm: FormGroup;

    submitForm(): void {       
        this.router.navigateByUrl('/dashboard');
        /*for (const i in this.loginForm.controls) {
            this.loginForm.controls[ i ].markAsDirty();
            this.loginForm.controls[ i ].updateValueAndValidity();
        }*/            
    }

    constructor(private fb: FormBuilder, private router: Router) {
    }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            userName: [ null, [ Validators.required ] ],
            password: [ null, [ Validators.required ] ]
        });
    }
}    