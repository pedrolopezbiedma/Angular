import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Output() clickedNavbar = new EventEmitter<string>();

  onNavigationClicked(clickedLink: string): void {
    this.clickedNavbar.emit(clickedLink);
  }
}
