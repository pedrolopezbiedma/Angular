import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  routeSubscription: Subscription;
  server: {id: number, name: string, status: string};

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    let serverId: number = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(serverId);

    this.routeSubscription = this.route.params.subscribe((params: Params) => {
      let serverId: number = +this.route.snapshot.params['id'];
      this.server = this.serversService.getServer(serverId);
    })
  }

}
