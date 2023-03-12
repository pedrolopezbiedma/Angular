import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-odd-number',
  templateUrl: './odd-number.component.html',
  styleUrls: ['./odd-number.component.css']
})
export class OddNumberComponent implements OnInit {
  @Input() num: number;

  constructor() { }

  ngOnInit(): void {
  }

}
