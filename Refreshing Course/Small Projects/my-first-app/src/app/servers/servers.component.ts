import { Component } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html'
})
export class ServersComponent {
  allowNewServer: boolean = false;
  serverCreationStatus: string = 'No server was created';
  serverName: string = '';

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 3000);
  }

  onCreateServer(payload: number) {
    this.serverCreationStatus = 'A server was created! ' + payload;
  }

  onInputChange(event: any) {
    this.serverName = event.target.value;
  }
}
