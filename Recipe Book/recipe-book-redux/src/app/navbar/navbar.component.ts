// Angular
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

// NgGx
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../store/app.reducer';
import * as AuthenticationActions from '../authentication/store/authentication.actions'

// Components, Services & Models
import { DatabaseService } from '../shared/services/database.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  authenticationStateSubscription: Subscription;
  userAuthenticated: boolean = false;

  constructor(
    private databaseService: DatabaseService,
    private store: Store<fromAppReducer.AppState>
  ) { }

  ngOnInit() {
    this.authenticationStateSubscription = this.store.select('authentication')
      .pipe(
        map((authenticationState) => {
          return authenticationState.user
        })
      ).subscribe(authenticatedUser => {
        this.userAuthenticated = authenticatedUser && authenticatedUser?.token !== null ? true : false;
        console.log('userIsAuthenticated -->', this.userAuthenticated);
      })
  }

  onLogout(): void {
    this.store.dispatch(AuthenticationActions.logoutAction());
  }

  onFetchData(): void {
    this.databaseService.fetchRecipes();
  }

  onSaveData(): void {
    this.databaseService.storeRecipces();
  }

  ngOnDestroy(): void {
    this.authenticationStateSubscription?.unsubscribe();
  }
}
