import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  forbiddenUsername = ['Pedro'];
  signupForm: FormGroup;

  ngOnInit(){
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], [this.forbiddenEmail]),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });

    this.signupForm.get('userData.username').setValue('Pedro');
    this.signupForm.patchValue({ 
      'userData': {
        'email': 'pjlopezb@gmail.com'
      }
    });

    this.signupForm.valueChanges
      .subscribe(value => {
        console.log('Por form ');
        console.log(value);
      });
  }

  forbiddenEmail(control: FormControl): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'test@test.com'){
          resolve({'emailForbidden': true});
        }
        else{
          resolve(null);
        }
      },1500);
    })
    return promise;
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if(this.forbiddenUsername.indexOf(control.value) !== -1){
      return {'nameIsForbidden': true};
    }
    return null;
  }

  onAddHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  onSubmit(){
    console.log(this.signupForm);
  }
}
