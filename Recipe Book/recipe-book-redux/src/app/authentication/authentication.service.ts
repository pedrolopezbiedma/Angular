// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

// NgRx
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../store/app.reducer';
import * as fromAuthenticationActions from '../authentication/store/authentication.actions';


// Components, Services & Models
import { User } from '../shared/models/user.model';

export class AuthenticationResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  signupEndpoint: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB2wybfjsm-j8KBd98_UjS9mHMfGlfOV80';
  loginEndpoint: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB2wybfjsm-j8KBd98_UjS9mHMfGlfOV80';
  // authenticatedUser: BehaviorSubject<User> = new BehaviorSubject(null);
  autoLogoutReference;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromAppReducer.AppState>
  ) { }

  signup(email: string, password: string): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(this.signupEndpoint, {
      email: email,
      password: password,
      returnSecureToken: true
    })
      .pipe(
        tap(response => {
          let expirationDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
          let authenticatedUser = new User(response.email, response.localId, response.idToken, expirationDate)
          localStorage.setItem('authenticatedUser', JSON.stringify(authenticatedUser));
          // this.authenticatedUser.next(authenticatedUser);
          this.store.dispatch(fromAuthenticationActions.loginSuccessAction({ user: authenticatedUser }));
        }),
        catchError(errorResponse => {
          let error = 'An error has ocurred!';
          if (!errorResponse.error || !errorResponse.error.error) {
            throwError(error);
          }
          switch (errorResponse.error.error.message) {
            case 'EMAIL_EXISTS':
              error = 'The email already exists!';
              break;
          }
          return throwError(error);
        })
      )
  }

  login(email: string, password: string): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(this.loginEndpoint, {
      email: email,
      password: password,
      returnSecureToken: true
    })
      .pipe(
        tap(response => {
          let expirationDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
          let authenticatedUser = new User(response.email, response.localId, response.idToken, expirationDate)
          localStorage.setItem('authenticatedUser', JSON.stringify(authenticatedUser));
          this.autoLogout(+response.expiresIn * 1000);
          // this.authenticatedUser.next(authenticatedUser);
          this.store.dispatch(fromAuthenticationActions.loginSuccessAction({ user: authenticatedUser }));
        }),
        catchError(errorResponse => {
          console.log(errorResponse);
          let error = 'An error has ocurred!';
          if (!errorResponse.error || !errorResponse.error.error) {
            throwError(error);
          }
          switch (errorResponse.error.error.message) {
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
        })
      )
  }

  autoLogin(): void {
    const authenticatedUser = JSON.parse(localStorage.getItem('authenticatedUser'));

    if (!authenticatedUser) {
      return
    }

    let expirationDate = new Date(authenticatedUser._tokenExpirationDate);
    let user = new User(authenticatedUser.email, authenticatedUser.id, authenticatedUser._token, expirationDate);
    const expirationDateTime = expirationDate.getTime() - new Date().getTime();
    this.autoLogout(expirationDateTime);
    // this.authenticatedUser.next(user);
    this.store.dispatch(fromAuthenticationActions.loginSuccessAction({ user: authenticatedUser }));

  }

  logout() {
    this.router.navigate(['/authentication']);
    localStorage.removeItem('authenticatedUser');
    clearTimeout(this.autoLogoutReference);
    // this.authenticatedUser.next(null);
    this.store.dispatch(fromAuthenticationActions.logoutAction());
  }

  autoLogout(expirationDate: number): void {
    this.autoLogoutReference = setTimeout(() => {
      this.logout();
    }, expirationDate);

  }
}