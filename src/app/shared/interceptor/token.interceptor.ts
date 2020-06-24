import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //if (currentUser && currentUser.token) {
        request = request.clone({
            // withCredentials: true,
            setHeaders: {
                Authorization: `Bearer 1234567890` // test token
            }
        });
        //}

        return next.handle(request);
    }
}
