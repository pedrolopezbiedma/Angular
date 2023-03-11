// Angular
import { Component } from '@angular/core';

// Components, Services & Models
import { DatabaseService } from '../shared/database.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    private databaseService: DatabaseService
  ) {}

  onFetchData(): void {
    this.databaseService.fetchRecipes();
  }

  onSaveData(): void {
    this.databaseService.storeRecipces();
  }
}
