import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class HttpHandlerService {

  private httpOptions = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private injector: Injector,
    private afAuth: AngularFireAuth
  ) { }

  sendPost(url, body, options = {}) {

    return this.http.post(url, body, this.httpOptions).toPromise()
      .then((response) => {
        return response;
      })
      .catch((e) => {

        if (e.status !== 404) {
          if (this.router == null) {
            this.router = this.injector.get(Router);
          }

          this.logoutUser();
          this.router.navigate(['authentication/error']);

          return false;
        } else {
          return e.error;
        }

      });
  }

  logoutUser() {
    console.log('Logging out');
    return this.afAuth.signOut().then(() => {
      localStorage.setItem('user', null);
      localStorage.setItem('token', null);
    });
  }

}
