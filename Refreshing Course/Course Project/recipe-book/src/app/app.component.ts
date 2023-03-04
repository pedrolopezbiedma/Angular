import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayedComponent: string = 'recipe';

  onClickedNavbar(clickedComponent: string){
    this,this.displayedComponent = clickedComponent;
  }
}
