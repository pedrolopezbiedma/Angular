import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  answer: string;
  genders: String[] = [ 'Male', 'Female'];
  selectedGender: string;

  suggestUserName(form: NgForm) {
    const suggestedName = 'Superuser';
    form.form.patchValue({
      userData : {
        username: suggestedName
      }
    })
  }

  onSubmit(form: NgForm): void {
    console.log('form is -->', form);
  }

  isFormInvalid(form: NgForm){
    return form.invalid;
  }
}
