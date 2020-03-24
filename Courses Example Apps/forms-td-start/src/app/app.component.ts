import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f', {static: false}) form: NgForm;
    genders = ['Male', 'Female'];

    suggestUserName() {
      const suggestedName = 'Superuser';
      this.form.form.patchValue({username: suggestedName});
  }

  /**
  onSubmit(form: NgForm){
    console.log(form);
  }
   */

   onSubmit(){
    console.log(this.form);
   }
}
