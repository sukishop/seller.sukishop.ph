import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {
    userData: any; // Save logged in user data

    constructor(
        public afAuth: AngularFireAuth, // Inject Firebase auth service
        public router: Router,
        public ngZone: NgZone // NgZone service to remove outside scope warning
    ) {
        /* Saving user data in localstorage when
        logged in and setting up null when logged out */
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));
            } else {
                localStorage.setItem('user', null);
            }
        })
    }

    // Sign in with email/password
    SignIn(email, password) {
        return this.afAuth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                this.ngZone.run(() => {
                    this.userData = result;
                    localStorage.setItem('user', JSON.stringify(this.userData));
                    this.router.navigate(['dashboard']);
                });
            }).catch((error) => {
                window.alert(error.message)
            })
    }

    // Sign up with email/password
    SignUp(email, password) {
        return this.afAuth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                /* Call the SendVerificaitonMail() function when new user sign
                up and returns promise */
                //this.SendVerificationMail();
                this.ngZone.run(() => {
                    this.userData = result;
                    localStorage.setItem('user', JSON.stringify(this.userData));
                    this.router.navigate(['authentication/register-business']);
                })
            }).catch((error) => {
                window.alert(error.message)
            })
    }

    // Send email verfificaiton when new user sign up
    SendVerificationMail() {
        return auth().currentUser.sendEmailVerification()
            .then(() => {
                this.router.navigate(['verify-email-address']);
            })
    }

    // Reset Forggot password
    ForgotPassword(passwordResetEmail) {
        return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
            .then(() => {
                window.alert('Password reset email sent, check your inbox.');
            }).catch((error) => {
                window.alert(error)
            })
    }

    // Returns true when user is looged in and email is verified
    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        return (user !== null) ? true : false;
    }

    // Sign in with Google
    GoogleAuth() {
        return this.AuthLogin(new auth.GoogleAuthProvider());
    }

    // Sign in with Google
    FacebookAuth() {
        return this.AuthLogin(new auth.FacebookAuthProvider());
    }

    // Auth logic to run auth providers
    AuthLogin(provider) {
        return this.afAuth.signInWithPopup(provider)
            .then((result) => {
                this.ngZone.run(() => {
                    this.userData = result;
                    localStorage.setItem('user', JSON.stringify(this.userData));
                    this.router.navigate(['dashboard']);
                })
            }).catch((error) => {
                window.alert(error)
            })
    }

    // Sign out
    SignOut() {
        return this.afAuth.signOut().then(() => {
            localStorage.removeItem('user');
            this.router.navigate(['authentication/login']);
        })
    }

}
