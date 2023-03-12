// Angular
import { Component } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';

// Components, Services & Models
import { DatabaseService } from '../shared/database.service';

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
        this.userAuthenticated = authenticatedUser.token === null ? false : true;
        console.log('userIsAuthenticated -->', this.userAuthenticated);
      })
  }

  onFetchData(): void {
    this.databaseService.fetchRecipes();
  }

  onSaveData(): void {
    this.databaseService.storeRecipces();
  }
}
