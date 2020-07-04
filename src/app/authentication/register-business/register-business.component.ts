import { Component } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthenticationService } from '../../shared/services/authentication.service';
import { HttpHandlerService } from '../../shared/services/http-handler.service';

@Component({
    templateUrl: './register-business.component.html'
})

export class RegisterBusinessComponent {

    registerForm: FormGroup;
    selectedFile = null;
    userData = [];

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthenticationService,
        private httpHandler: HttpHandlerService
    ) {
    }

    ngOnInit(): void {
        const hasUserData = this.authService.hasUserData;

        if (!hasUserData) {
            this.router.navigateByUrl('/authentication/login');
        } else {
            this.userData = JSON.parse(localStorage.getItem('user'));
        }

        if (
            !this.userData['email'] ||
            this.userData['email'].length === 0 ||
            !this.userData['uid'] ||
            this.userData['uid'].length === 0
        ) {
            this.router.navigateByUrl('/authentication/login');
        }

        this.registerForm = this.fb.group({
            businessName: [null, [Validators.required]],
            businessAddress: [null, [Validators.required]],
            phoneNumber: [null, [Validators.required]],
            businessOwnerFirstName: [null, [Validators.required]],
            businessOwnerLastName: [null, [Validators.required]],
            businessLogo: [null],
            agree: [true, [this.isAgreeChecked]]
        });
    }

    async submitForm() {
        for (const i in this.registerForm.controls) {
            this.registerForm.controls[i].markAsDirty();
            this.registerForm.controls[i].updateValueAndValidity();
        }

        if (this.registerForm.valid) {
            let userBody = {
                'first_name': this.registerForm.get('businessOwnerFirstName').value,
                'last_name': this.registerForm.get('businessOwnerLastName').value,
                'email': this.userData['email'],
                'dob': '01/01/2020',
                'uuid': this.userData['uid']
            };

            let businessBody = {
                'uuid': this.userData['uid'],
                'business_name': this.registerForm.get('businessName').value,
                'business_address': this.registerForm.get('businessAddress').value,
                'phone_number': this.registerForm.get('phoneNumber').value,
                'business_logo': this.selectedFile.name || '',
                'database': 'db_' + this.userData['uid']
            };

            let userRequest = await this.httpHandler.sendPost('https://api.sukishop.ph/v1/user/register', userBody);
            let businessRequest = await this.httpHandler.sendPost('https://api.sukishop.ph/v1/business/signup', businessBody);

            if (userRequest && businessRequest) {
                let token = await this.httpHandler.sendPost('https://api.sukishop.ph/v1/auth/get-token', {
                    'grant_type': 'password',
                    'username': this.userData['email'],
                    'uuid': this.userData['uid']
                });

                if (token.error && token.error === 'NOT_FOUND') {
                    this.router.navigate(['authentication/error']);
                } else {
                    localStorage.setItem('token', token.token);
                    this.router.navigate(['dashboard']);
                }
            }
        }
    }

    isAgreeChecked(control) {
        if (control.value === false) {
            return { 'isAgreeChecked': true };
        }

        return null;
    }

    onFileSelected(e) {
        this.selectedFile = e.target.files[0];
    }
}
