// Angular
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

// NgGx
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../store/app.reducer';
import * as AuthenticationActions from '../authentication/store/authentication.actions'
import * as RecipeBookActions from '../recipe-book/store/recipe-book.actions'

// Components, Services & Models
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  authenticationStateSubscription: Subscription;
  user: User;
  userAuthenticated: boolean = false;

  constructor(
    private store: Store<fromAppReducer.AppState>
  ) { }

  ngOnInit() {
    this.authenticationStateSubscription = this.store.select('authentication')
      .pipe(
        map((authenticationState) => {
          return authenticationState.user
        })
      ).subscribe(authenticatedUser => {
        this.user = authenticatedUser;
        this.userAuthenticated = authenticatedUser && authenticatedUser?.token !== null ? true : false;
        console.log('userIsAuthenticated -->', this.userAuthenticated);
      })
  }

  onLogout(): void {
    this.store.dispatch(AuthenticationActions.logoutAction());
  }

  onFetchData(): void {
    this.store.dispatch(RecipeBookActions.fetchRecipes({ user: this.user }))
  }

  onSaveData(): void {
    this.store.dispatch(RecipeBookActions.storeRecipes({ user: this.user }))
  }

  ngOnDestroy(): void {
    this.authenticationStateSubscription?.unsubscribe();
  }
}
