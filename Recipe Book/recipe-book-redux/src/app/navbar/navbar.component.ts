// Angular
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';

// NgGx
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../store/app.reducer';

// Components, Services & Models
import { DatabaseService } from '../shared/services/database.service';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  userAuthenticated: boolean = false;

  constructor(
    private databaseService: DatabaseService,
    private authenticationService: AuthenticationService,
    private store: Store<fromAppReducer.AppState>
  ) {}

  ngOnInit() {
    // this.authenticationService.authenticatedUser
    //   .subscribe(authenticatedUser => {
    //     this.userAuthenticated = authenticatedUser && authenticatedUser?.token !== null ? true : false;
    //     console.log('userIsAuthenticated -->', this.userAuthenticated);
    //   })
    this.store.select('authentication')
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
    this.authenticationService.logout();
  }

  onFetchData(): void {
    this.databaseService.fetchRecipes();
  }

  onSaveData(): void {
    this.databaseService.storeRecipces();
  }
}
