// Angular
import { Component } from '@angular/core';

// Components, Services & Models
import { AccountsService } from './shared/services/accounts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AccountsService]
})
export class AppComponent {
  accounts: { name: string, status: string }[] = [];

  constructor(private accountsService: AccountsService){}

  ngOnInit() {
    this.accounts = this.accountsService.accounts;
  }
}
