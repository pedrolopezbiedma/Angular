import { Component, OnDestroy, OnInit } from '@angular/core';

import { interval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe((count: number) => {
    //   console.log('count -->', count)
    // })
    const myObservable = Observable.create((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count)
        count++;
      }, 1000)
    });

    this.firstObsSubscription = myObservable.subscribe((count: Number) => {
      console.log(count);
    })
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }

}
