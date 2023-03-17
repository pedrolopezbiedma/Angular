// Angular
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

// NgRx
import { Store } from '@ngrx/store';
import * as AppReducer from '../store/app.reducer'
import * as AuthenticationActions from './store/authentication.actions';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit, OnDestroy {
  authenticationStateSubscription: Subscription
  loginMode: boolean = true;
  isPending: boolean = false;
  error: string = null;

  constructor(
    private store: Store<AppReducer.AppState>
  ) { }

  ngOnInit(): void {
    this.authenticationStateSubscription = this.store.select('authentication').subscribe(state => {
      this.isPending = state.isLoading;
      this.error = state.error
    })
  }

  onToggleMode(): void {
    this.loginMode = !this.loginMode;
  }

  onSubmit(authenticationForm: NgForm) {
    this.isPending = true;

    console.log('[Authentication Component] Authentication form values --> ', authenticationForm.value)
    if (this.loginMode) {
      this.store.dispatch(AuthenticationActions.loginStartAction({ email: authenticationForm.value.email, password: authenticationForm.value.password }));
    } else {
      this.store.dispatch(AuthenticationActions.signupStartAction({ email: authenticationForm.value.email, password: authenticationForm.value.password }));
    }
    authenticationForm.reset();
  }

  ngOnDestroy(): void {
    this.authenticationStateSubscription?.unsubscribe();
  }
}
