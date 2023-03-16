// Angular
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { switchMap, map, catchError, tap } from "rxjs/operators";

// NgRx
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AuthenticationActions from './authentication.actions'

// Components, Services & Models
import { User } from "src/app/shared/models/user.model";

export class AuthenticationResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthenticationEffects {

  loginEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.loginStartAction),
      switchMap(action => {
        return this.http.post<AuthenticationResponse>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB2wybfjsm-j8KBd98_UjS9mHMfGlfOV80', {
          email: action.email,
          password: action.password,
          returnSecureToken: true
        })
          .pipe(
            map(response => {
              let loggedUser = new User(
                response.email,
                response.localId,
                response.idToken,
                new Date(new Date().getTime() + +response.expiresIn * 1000)
              )
              return AuthenticationActions.loginSuccessAction({ user: loggedUser })
            }),
            catchError(errorResponse => {
              let errorMessage = 'An error has ocurred!';
              if (!errorResponse.error || !errorResponse.error.error) {
                return of(AuthenticationActions.loginErrorAction({ errorMessage }))
              }
              switch (errorResponse.error.error.message) {
                case 'EMAIL_NOT_FOUND':
                  errorMessage = 'The email is not correct!';
                  break;
                case 'INVALID_PASSWORD':
                  errorMessage = 'The password is not correct!';
                  break;
                case 'USER_DISABLED':
                  errorMessage = 'The user is disabled!';
                  break;
              }
              return of(AuthenticationActions.loginErrorAction({ errorMessage }))
            })
          );
      })
    )
  );

  loggedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.loginSuccessAction),
      tap(() => {
        this.router.navigate(['/'])
      })
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) { }

}
