// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  constructor(
    private http: HttpClient
  ) { }

  signup(email: string, password: string): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(this.signupEndpoint, {
      email: email,
      password: password,
      returnSecureToken: true
    })
  }
}
