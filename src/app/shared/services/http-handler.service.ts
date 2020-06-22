import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class HttpHandlerService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private injector: Injector,
    private afAuth: AngularFireAuth
  ) { }

  sendPost(url, body, options = {}) {

    console.log('Posting data');

    return this.http.post(url, body, this.httpOptions).toPromise()
      .then((response) => {
        return response;
      })
      .catch((e) => {

        if (this.router == null) {
          this.router = this.injector.get(Router);
        }

        this.logoutUser();
        this.router.navigate(['authentication/error']);

        return false;
      });
  }

  logoutUser() {
    console.log('Logging out');
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    });
  }

}
