import { Component, OnInit } from '@angular/core';
import { Observable, of, tap, map, Subscription } from 'rxjs';

interface User {
  firstName: string;
  lastName: string;
  age: number;
  email: string
}

const users = [
  { firstName: 'Pedro', lastName: 'Lopez', age: 35, email: 'pjlopezb@gmail.com'},
  { firstName: 'Pablo', lastName: 'Lopez', age: 5, email: 'pablo@gmail.com'},
  { firstName: 'Lucas', lastName: 'Lopez', age: 3, email: 'lucas@gmail.com'},
  { firstName: 'Lucia', lastName: 'Lopez', age: 37, email: 'lucia@gmail.com'}
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  initialUsers$ = of(users);
  users$: Observable<User[]> = new Observable();
  updatedUsers$: Observable<User[]> = new Observable();

  ngOnInit(): void {
    this.chapterOne();
  }

  chapterOne() : void {
    this.defaultUsers();
    this.transformUsers();
  }

  // ***** Chapter One *****
  defaultUsers(): void {
    this.users$ = this.initialUsers$
      .pipe(
        tap(users => {
          console.log('users are ->', users);
        })
      )
  }

  transformUsers(): void {
    this.updatedUsers$ = this.initialUsers$
    .pipe(
      map(users => {
        let newUsers: User[] = [];
        users.forEach(user => {
          newUsers.push({
            ...user,
            firstName: user.firstName.toUpperCase()
          });
        })
        return newUsers;
      }),
      tap(users => {
        console.log('updated users are ->', users);
      })
    )
  }

  // ***** Chapter Two *****
}