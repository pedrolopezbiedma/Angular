import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    let serverId: number = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(serverId);

    this.routeSubscription = this.route.params.subscribe((params: Params) => {
      let serverId: number = +this.route.snapshot.params['id'];
      this.server = this.serversService.getServer(serverId);
    })
  }

  onEdit(){
    this.router.navigate(['/servers', this.server.id,'edit'], { queryParamsHandling: 'preserve'})
  }
}
