// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

export class AuthenticationResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  signupEndpoint: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB2wybfjsm-j8KBd98_UjS9mHMfGlfOV80';
  loginEndpoint: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB2wybfjsm-j8KBd98_UjS9mHMfGlfOV80';

  constructor(
    private http: HttpClient
  ) { }

  signup(email: string, password: string): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(this.signupEndpoint, {
      email: email,
      password: password,
      returnSecureToken: true
    })
    .pipe(catchError(errorResponse => {
      let error =  'An error has ocurred!';
      switch(errorResponse.error.error.message){
        case 'EMAIL_EXISTS':
          error = 'The email already exists!';
          break;
      }
      return throwError(error);
    }))
  }

  login(email: string, password: string): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(this.loginEndpoint, {
      email: email,
      password: password,
      returnSecureToken: true
    })
    .pipe(catchError(errorResponse => {
      let error =  'An error has ocurred!';
      switch(errorResponse.error.error.message){
        case 'EMAIL_NOT_FOUND':
          error = 'The email is not correct!';
          break;
        case 'INVALID_PASSWORD':
          error = 'The password is not correct!';
          break;
        case 'USER_DISABLED':
          error = 'The user is disabled!';
          break;
      }
      return throwError(error);
    }))
  }

}
