import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  Observable,
  of,
  tap,
  map,
  Subscription,
  from,
  fromEvent,
  interval,
  debounceTime,
  take,
  takeWhile,
  takeLast,
  first,
  last,
  elementAt,
  filter,
  pipe,
  distinct,
  skip,
  count,
  min,
  max,
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
const categories = [
  'Books',
  'TV',
  'Books',
  'Music',
  'TV',
  'Shows',
  'TV',
  'Books',
  'Music',
  'TV',
  'Music',
];
const numbers = [2, 4, 6, 7, 8, 12, 45, 12, 345, 6];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  initialUsers$ = of(users);
  notUpdatedUsers$: Observable<User[]>;
  updatedUsers$: Observable<User[]>;
  orders$: Observable<string>;
  timedOrders$: Observable<string>;
  orderSubscription: Subscription;
  intervalSubscriptions: Subscription[] = [];

  @ViewChild('linkObservable') hrefLink: ElementRef | undefined;
  eventObservable$: Observable<any>;

  categoriesTakeLast$: Observable<string>;
  categoriesFirst$: Observable<string>;
  categoriesFilter$: Observable<string>;
  categoriesDisctinct$: Observable<string>;
  categoriesLast$: Observable<string>;
  categoriesElementAt$: Observable<string>;
  categoriesSkip$: Observable<string>;
  categoriesCount$: Observable<number>;

  numMin$: Observable<number>;
  numMax$: Observable<number>;

  searchForm: FormGroup;
  takeWhileCounter: number = 0;

  ngOnInit(): void {
    this.searchForm = new FormGroup({ name: new FormControl('Type here') });
    this.defaultUsers();
    this.transformUsers();
    this.fromOrders();
    this.formSubscription();
    this.categoriesMethods();
    this.numbersMethods();
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

  fromOrders(): void {
    this.orders$ = from(orders).pipe(
      tap((value) => {
        console.log('Value is - ', value);
      })
    );
  }

  getEventObservable(): void {
    this.eventObservable$ = fromEvent(
      this.hrefLink?.nativeElement,
      'mouseover'
    );

    this.eventObservable$.subscribe((data) => {
      console.log(data);
    });
  }

  startSubscriptions(): void {
    this.timedOrders$ = from(orders);

    this.orderSubscription = this.timedOrders$.subscribe((order) => {
      let internalTick$ = interval(1000);

      const intervalSubscription = internalTick$.subscribe((intervalTick) => {
        console.log('Tick is: ', order, ' ---- ', intervalTick);
      });
      this.intervalSubscriptions.push(intervalSubscription);
    });
  }

  stopSubscriptions(): void {
    this.orderSubscription.unsubscribe();
    this.intervalSubscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  formSubscription(): void {
    this.searchForm
      .get('name')
      ?.valueChanges.pipe(
        debounceTime(500),
        // take(5) // Only take the first X emits of the observable
        takeWhile((take) => this.takeWhileMethod()) // Only takes emits while the method return true
      )
      .subscribe((value) => {
        console.log('Value in form is -> ', value);
      });
  }

  categoriesMethods(): void {
    this.categoriesTakeLast$ = from(categories).pipe(
      takeLast(2),
      tap((value) => {
        console.log('categories are -> ', value);
      })
    );

    this.categoriesFirst$ = from(categories).pipe(
      first(),
      tap((value) => {
        console.log('Value con first es: ', value);
      })
    );

    this.categoriesLast$ = from(categories).pipe(
      last(),
      tap((value) => {
        console.log('Value with Last is: ', value);
      })
    );

    this.categoriesElementAt$ = from(categories).pipe(
      elementAt(2),
      tap((value) => console.log('Value with elementAt is: ', value))
    );

    this.categoriesFilter$ = from(categories).pipe(
      filter((value) => this.filterMethod(value)),
      tap((value) => console.log('Values with filter are: ', value))
    );

    this.categoriesDisctinct$ = from(categories).pipe(
      distinct(),
      tap((value) => console.log('Values with distinct are: ', value))
    );

    this.categoriesSkip$ = from(categories).pipe(
      skip(3),
      tap((value) => console.log('Values with skip are: ', value))
    );

    this.categoriesCount$ = from(categories).pipe(
      // filter((value) => this.filterMethod(value)),
      count(),
      tap((value) => console.log('Value with count is: ', value))
    );
  }

  numbersMethods(): void {
    this.numMax$ = from(numbers).pipe(
      max(),
      tap((value) => console.log('Value with max is: ', value))
    );

    this.numMin$ = from(numbers).pipe(
      min(),
      tap((value) => console.log('Value with min is: ', value))
    );
  }

  private takeWhileMethod(): boolean {
    this.takeWhileCounter++;
    return this.takeWhileCounter < 3 ? true : false;
  }

  private filterMethod(value: string): boolean {
    return value === 'Books' ? true : false;
  }
}
