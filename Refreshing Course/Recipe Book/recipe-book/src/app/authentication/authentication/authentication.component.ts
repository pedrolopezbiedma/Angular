// Angular
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

// Components, Services & Models
import { AuthenticationService } from 'src/app/shared/authentication.service';

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
    private authenticationService: AuthenticationService
  ) {}

  onToggleMode(): void {
    this.loginMode = !this.loginMode;
  }

  onSubmit(authenticationForm: NgForm){
    console.log(authenticationForm.value)
    if(this.loginMode){
      // Login the user
    } else {
      this.authenticationService.signup(authenticationForm.value.email, authenticationForm.value.password)
        .subscribe(response => {
          console.log(response)
          this.isPending = false;
        }, error => {
          console.log(error);
          this.error = 'An error has ocurred!';
          this.isPending = false;
        })
    }
    authenticationForm.reset();
  }
}
