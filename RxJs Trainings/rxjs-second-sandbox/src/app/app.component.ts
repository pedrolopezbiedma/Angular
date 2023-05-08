import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  Observable,
  of,
  tap,
  map,
  Subscription,
  from,
  fromEvent,
  interval,
} from 'rxjs';

interface User {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
}

const users = [
  {
    firstName: 'Pedro',
    lastName: 'Lopez',
    age: 35,
    email: 'pjlopezb@gmail.com',
  },
  { firstName: 'Pablo', lastName: 'Lopez', age: 5, email: 'pablo@gmail.com' },
  { firstName: 'Lucas', lastName: 'Lopez', age: 3, email: 'lucas@gmail.com' },
  { firstName: 'Lucia', lastName: 'Lopez', age: 37, email: 'lucia@gmail.com' },
];

const orders = ['Music', 'Playground', 'Food', 'Toys'];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  initialUsers$ = of(users);
  notUpdatedUsers$: Observable<User[]> = new Observable();
  updatedUsers$: Observable<User[]> = new Observable();

  orders$: Observable<string> = new Observable();
  timedOrders$: Observable<string> = new Observable();
  orderSubscription: Subscription = new Subscription();
  intervalSubscriptions: Subscription[] = [];

  @ViewChild('linkObservable') hrefLink: ElementRef | undefined;
  eventObservable$: Observable<any> = new Observable();

  ngOnInit(): void {
    this.chapterOne();
    this.chapterTwo();
    this.chapterFour();
  }

  chapterOne(): void {
    this.defaultUsers();
    this.transformUsers();
  }

  defaultUsers(): void {
    this.notUpdatedUsers$ = this.initialUsers$.pipe(
      tap((users) => {
        console.log('users are ->', users);
      })
    );
  }

  transformUsers(): void {
    this.updatedUsers$ = this.initialUsers$.pipe(
      map((users) => {
        let newUsers: User[] = [];
        users.forEach((user) => {
          newUsers.push({
            ...user,
            firstName: user.firstName.toUpperCase(),
          });
        });
        return newUsers;
      }),
      tap((users) => {
        console.log('updated users are ->', users);
      })
    );
  }

  chapterTwo(): void {
    this.orders$ = from(orders).pipe(
      tap((value) => {
        console.log('Value is - ', value);
      })
    );
  }

  getObservable(): void {
    this.eventObservable$ = fromEvent(
      this.hrefLink?.nativeElement,
      'mouseover'
    );

    this.eventObservable$.subscribe((data) => {
      console.log(data);
    });
  }

  chapterFour(): void {
    this.timedOrders$ = from(orders);

    this.orderSubscription = this.timedOrders$.subscribe((order) => {
      let internalTick$ = interval(1000);

      const intervalSubscription = internalTick$.subscribe((intervalTick) => {
        console.log('Tick is: ', order, ' ---- ', intervalTick);
      });
      this.intervalSubscriptions.push(intervalSubscription);
    });
  }

  stopSubscription(): void {
    this.orderSubscription.unsubscribe();
    this.intervalSubscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
