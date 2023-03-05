// Angular
import { Component } from '@angular/core';

// Component, Services & Models
import { AccountsService } from '../shared/services/accounts.service';
import { LoggingService } from '../shared/services/logging.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  providers: [LoggingService]
})
export class NewAccountComponent {

  constructor(private loggingService: LoggingService, private accountsService: AccountsService){}

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountsService.addAccount(accountName, accountStatus);
    this.loggingService.logStatus(accountStatus);
  }
}
