import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  @Output() secondPassed = new EventEmitter<number>();
  second:number = 0;
  ref: any;

  constructor() { }

  ngOnInit(): void {
  }

  startGame(): void {
    this.ref = setInterval(function(){
      this.secondPassed.emit(this.second);
      this.second++;
      console.log('Event emitted with -->', this.second)
    }.bind(this), 1000);
  }

  stopGame(): void {
    clearInterval(this.ref)
  }
}
