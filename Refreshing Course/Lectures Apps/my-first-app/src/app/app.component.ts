import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  detailsDisplayed: boolean = false;
  clicksLog:Date[] = [];

  togglePassword(): void {
    this.detailsDisplayed = !this.detailsDisplayed;
    this.clicksLog.push(new Date());
  }
}
