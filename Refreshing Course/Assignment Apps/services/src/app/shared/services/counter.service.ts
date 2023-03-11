import { EventEmitter, Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class CounterService {
  activeToInactiveCounter = new EventEmitter<number>();
  inactiveToActiveCounter = new EventEmitter<number>();
  counter1: number = 0;
  counter2: number = 0;

  constructor() { }

  addActiveToInactive(): void {
    this.counter1++;
    this.activeToInactiveCounter.emit(this.counter1);
  }

  addInactiveToActive(): void {
    this.counter2++;
    this.inactiveToActiveCounter.emit(this.counter2);
  }
}
