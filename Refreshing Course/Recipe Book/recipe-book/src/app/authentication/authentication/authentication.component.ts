// Angular
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

// Components, Services & Models
import { AuthenticationResponse, AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {
  loginMode: boolean = true;
  isPending: boolean = false;
  error: string = null;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  onToggleMode(): void {
    this.loginMode = !this.loginMode;
  }

  onSubmit(authenticationForm: NgForm){
    this.isPending = true;
    let authenticationObservable: Observable<AuthenticationResponse>;

    console.log(authenticationForm.value)
    if(this.loginMode){
      authenticationObservable = this.authenticationService.login(authenticationForm.value.email, authenticationForm.value.password)
    } else {
      authenticationObservable = this.authenticationService.signup(authenticationForm.value.email, authenticationForm.value.password)
    }

    authenticationObservable.subscribe(response => {
      console.log('Authentication ok response -->', response)
      this.isPending = false;
      this.router.navigate(['recipe-book']);
    }, errorResponse => {
      console.log('Authentication error response -->', errorResponse)
      this.error = errorResponse;
      this.isPending = false;
    })

    authenticationForm.reset();
  }
}
