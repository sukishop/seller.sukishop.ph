import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ErrorComponent } from './error/error.component';
import { RegisterBusinessComponent } from './register-business/register-business.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        data: {
            title: 'Login'
        }
    },    
    { 
        path: 'sign-up',
        component: SignUpComponent,
        data: {
            title: 'Sign Up'
        }
    },    
    {
        path: 'error',
        component: ErrorComponent,
        data: {
            title: 'Error'
        }
    },
    {
        path: 'register-business',
        component: RegisterBusinessComponent,
        data: {
            title: 'Register Business'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthenticationRoutingModule { }
