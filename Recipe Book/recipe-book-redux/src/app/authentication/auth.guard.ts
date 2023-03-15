// Angular
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

// NgRx
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../store/app.reducer';

// Components, Services & Models
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private store: Store<fromAppReducer.AppState>
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot,
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    // return this.authService.authenticatedUser.pipe(
    return this.store.select('authentication').pipe(
      take(1),
      map(authenticationState => {
        return authenticationState.user
      }),
      map(user => {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/authentication']);
      })
    );
  }
}
