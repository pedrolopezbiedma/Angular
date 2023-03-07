import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthService {
  logged = false;

  logIn() {
    this.logged = true;
  }

  logOut() {
    this.logged = false;
  }

  getLoggedStatus() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.logged)
      }, 800)
    })
    return promise;
  }
}
