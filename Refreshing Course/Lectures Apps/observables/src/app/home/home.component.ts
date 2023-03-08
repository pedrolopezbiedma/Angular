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

        if( count > 5 ){
          observer.complete()
        }

        if( count > 10 ){
          observer.error(new Error('Count is greater than 3'))
        }
        count++;
      }, 1000)
    });

    this.firstObsSubscription = myObservable.subscribe((count: Number) => {
      console.log(count);
    }, (error => {
      console.log('error is -->', error)
    }), () => {
      console.log('The observable is completed');
    })
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }

}
