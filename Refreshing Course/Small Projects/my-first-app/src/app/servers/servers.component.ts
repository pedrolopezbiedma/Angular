import { Component } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html'
})
export class ServersComponent {
  allowNewServer: boolean = false;
  serverCreationStatus: string = 'No server was created';
  serverCreated: boolean = false;
  serverName: string = '';
  username: string = '';

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 3000);
  }

  onCreateServer(): void {
    this.serverCreationStatus = 'A server was created, name is: ' + this.serverName;
    this.serverCreated = true;
  }

  onInputChange(event: any): void {
    this.serverName = event.target.value;
  }

  onResetUsername(): void {
    this.username = '';
  }
}
