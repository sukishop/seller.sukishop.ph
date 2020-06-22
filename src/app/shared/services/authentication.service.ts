import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { HttpHandlerService } from './http-handler.service';

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {
    userData: any; // Save logged in user data

    constructor(
        private httpHandler: HttpHandlerService,
        public afAuth: AngularFireAuth, // Inject Firebase auth service
        public router: Router,
        public ngZone: NgZone // NgZone service to remove outside scope warning
    ) {
        /* Saving user data in localstorage when
        logged in and setting up null when logged out */
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.setUserData(user);
                localStorage.setItem('user', JSON.stringify(this.userData));
            } else {
                localStorage.setItem('user', null);
            }
        })
    }

    // Sign in with email/password
    signIn(email, password) {
        return this.afAuth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                this.ngZone.run(async () => {
                    this.setUserData(result);
                    localStorage.setItem('user', JSON.stringify(this.userData));

                    console.log('Starting get-token');
                    // let token = await this.httpHandler.sendPost('https://api.sukishop.ph/v1/auth/get-token', {
                    //     'grant_type': 'password',
                    //     'username': this.userData.email,
                    //     'uuid': this.userData.uid
                    // });
                    let token = await this.httpHandler.sendPost('https://api.sukishop.ph/v1/auth/get-token', 'uuid=123');
                    console.log('Finished get-token');
                    console.log(result);

                    if (token) {
                        this.router.navigate(['dashboard']);
                    }
                    //});
                });
            }).catch((error) => {
                window.alert(error.message)
            })
    }

    // Sign up with email/password
    signUp(email, password) {
        return this.afAuth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                /* Call the SendVerificaitonMail() function when new user sign
                up and returns promise */
                //this.SendVerificationMail();
                this.setUserData(result);
                this.ngZone.run(() => {
                    localStorage.setItem('user', JSON.stringify(this.userData));
                    this.router.navigate(['authentication/register-business']);
                })
            }).catch((error) => {
                window.alert(error.message)
            })
    }

    // Send email verfificaiton when new user sign up
    sendVerificationMail() {
        return auth().currentUser.sendEmailVerification()
            .then(() => {
                this.router.navigate(['verify-email-address']);
            })
    }

    // Reset Forggot password
    forgotPassword(passwordResetEmail) {
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
    googleAuth() {
        return this.authLogin(new auth.GoogleAuthProvider());
    }

    // Sign in with Google
    facebookAuth() {
        return this.authLogin(new auth.FacebookAuthProvider());
    }

    // Auth logic to run auth providers
    authLogin(provider) {
        return this.afAuth.signInWithPopup(provider)
            .then((result) => {
                this.ngZone.run(() => {
                    this.setUserData(result);
                    localStorage.setItem('user', JSON.stringify(this.userData));
                    this.router.navigate(['dashboard']);
                })
            }).catch((error) => {
                window.alert(error)
            })
    }

    // Sign out
    signOut() {
        return this.afAuth.signOut().then(() => {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            this.router.navigate(['authentication/login']);
        });
    }

    setUserData(response) {
        console.log(response);
        let firebaseData = response.user ? response.user : response;
        let providerIndex = firebaseData.providerData.length - 1;
        this.userData = {
            'name': firebaseData.displayName,
            'email': firebaseData.email,
            'uid': firebaseData.uid,
            'photoURL': firebaseData.photoURL,
            'provider': firebaseData.providerData[providerIndex].providerId
        }
    }
}
