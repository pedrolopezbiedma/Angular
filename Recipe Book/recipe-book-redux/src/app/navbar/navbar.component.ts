// Angular
import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';

// Components, Services & Models
import { DatabaseService } from '../shared/services/database.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  userAuthenticated: boolean = false;

  constructor(
    private databaseService: DatabaseService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.authenticationService.authenticatedUser
      .subscribe(authenticatedUser => {
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
