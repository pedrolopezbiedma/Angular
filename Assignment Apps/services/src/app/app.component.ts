// Angular
import { Component, OnInit } from '@angular/core';

// Components, Services & Models
import { UsersService } from './shared/services/users.service';
import { CounterService } from './shared/services/counter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  activeUsers: string[] = [];
  inactiveUsers: string[] = [];
  activeToInactiveCounter: number = 0;
  inactiveToActiveCounter: number = 0;

  constructor(private usersService: UsersService, private counterService: CounterService){}

  ngOnInit() {
    this.activeUsers = this.usersService.activeUsers;
    this.inactiveUsers = this.usersService.inactiveUsers;
    this.counterService.activeToInactiveCounter.subscribe(counter => {
      this.activeToInactiveCounter = counter
    });
    this.counterService.inactiveToActiveCounter.subscribe(counter => {
      this.inactiveToActiveCounter = counter
    });
  }
}
