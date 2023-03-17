//Angular
import { Component, OnInit } from '@angular/core';

// NgRx
import { Store } from '@ngrx/store';
import * as AppReducer from './store/app.reducer';
import * as AuthenticationActions from './authentication/store/authentication.actions'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<AppReducer.AppState>
  ) { }

  ngOnInit() {
    // this.authenticationService.autoLogin();
    this.store.dispatch(AuthenticationActions.autoLoginAction());
  }
}
