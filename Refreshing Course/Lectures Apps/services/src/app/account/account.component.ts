// Angular
import { Component, EventEmitter, Input, Output } from '@angular/core';

// Component, Servies & Models
import { AccountsService } from '../shared/services/accounts.service';
import { LoggingService } from '../shared/services/logging.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;
  @Output() statusChanged = new EventEmitter<{id: number, newStatus: string}>();

  constructor(private loggingService: LoggingService, private accountsService: AccountsService){}

  onSetTo(status: string) {
    this.accountsService.updateStatus(this.id, status)
    this.loggingService.logStatus(status);
  }
}
