import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  BehaviorSubject,
  Observable,
  Subject,
  debounceTime,
  delay,
  distinctUntilChanged,
  filter,
  from,
  fromEvent,
  interval,
  map,
  mergeMap,
  of,
  reduce,
  scan,
  switchMap,
  tap,
  throttleTime,
} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  zero = 0;
  clickedButton: boolean = false;
  numbers: number[] = [1, 2, 3, 4, 5];
  letters: string[] = ['a', 'b', 'c'];
  form1: FormGroup;
  form2: FormGroup;

  interval$: Observable<number>;
  mappedInterval$: Observable<number>;
  filteredInterval$: Observable<number>;
  reducedNumbers$: Observable<number>;
  scannedNumbers$: Observable<number>;
  fromEvent$: Observable<any>;

  emittedSubject$: Subject<string> = new Subject<string>();
  writtenInputSubject1: Subject<string> = new Subject<string>();

  clickedButton$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  ngOnInit(): void {
    this.interval$ = interval(1000);
    this.mappedInterval$ = interval(1000).pipe(
      throttleTime(5000),
      map((value) => value * 2)
    );
    this.filteredInterval$ = interval(1000).pipe(
      filter((value) => value % 2 === 0)
    );

    this.form1 = new FormGroup({ input1: new FormControl('') });
    this.form1
      .get('input1')
      ?.valueChanges.pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((value) => {
        console.log('Emitted an event');
        this.writtenInputSubject1.next(value);
      });

    this.reducedNumbers$ = from(this.numbers).pipe(
      reduce((numberSum, total) => {
        return numberSum + total;
      }, this.zero)
    );

    this.scannedNumbers$ = from(this.numbers).pipe(
      scan((numberSum, total) => {
        return numberSum + total;
      }, 0)
    );

    this.form2 = new FormGroup({
      input2: new FormControl(''),
    });

    this.form2
      .get('input2')
      ?.valueChanges.pipe(
        mergeMap((input2Value) => {
          return from(this.letters).pipe(
            map((letter) => {
              return input2Value + letter;
            })
          );
        })
      )
      .subscribe((value) => {
        console.log('Value is -> ', value);
      });
  }

  saveLocation(location: any) {
    return of(location).pipe(delay(500));
  }

  giveMeSubjectNotification(): void {
    console.log('Button was clicked');
    this.emittedSubject$.next('Button was clicked');
  }

  startInterval(event: Event): void {
    this.fromEvent$ = fromEvent(document, 'click').pipe(
      switchMap((event) => {
        return interval(1000);
      })
    );
  }

  clickedBehaviourSubject(): void {
    this.clickedButton$.next(true);
  }

  // Vamos a hacer una set up en la que cuando clicamos un boton, un subject haga un 'Clicked!' en la console.log.
  // Ahora, vamos a cambiar el subject por un behaviourSubject para que tenga un valor por defecto.
}
