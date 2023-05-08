import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, concat, merge, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit {

  initialObservable$: Observable<number> = of(1, 2, 3, 4, 5);
  initialObservable2$: Observable<number> = of(6, 7, 8);
  exerciseOne$: Observable<number> = new Observable();
  exerciseTwo$: Observable<number> = new Observable();
  exerciseThree$: Observable<number> = new Observable();
  exerciseFour$: Observable<number> = new Observable();
  subscription$: Subscription = new Subscription;

  ngOnInit(): void {
    this.exerciseOne();
    this.exerciseTwo();
    this.exerciseThree();
    this.exerciseFour();
  }

  exerciseOne() : void {
    this.exerciseOne$ = this.initialObservable$
      .pipe(
        map((value: number) => {
          return value*value;
        }),
        tap((value: number) => console.log('Exercise 1 - ', value))
      )
  }

  exerciseTwo(): void {
    this.exerciseTwo$ = this.initialObservable$
      .pipe(
        delay(3000),
        map((value: number) => {
          if(value % 2  !== 0){
            return value;
          } else {
            return 0;
          }
        }),
        tap((value: number) => console.log('Exercise 2 - ', value))
      )
  }

  exerciseThree(): void {
    this.exerciseThree$ = merge(this.initialObservable$, this.initialObservable2$)
      .pipe(
        tap(value => { console.log('Exercise 3 - ', value)})
      )
  }

  exerciseFour(): void {
    this.exerciseFour$ = concat(this.initialObservable$, this.initialObservable2$)
      .pipe(
        tap(value => console.log('Exercise 4 - ', value))
      )
  }
}
