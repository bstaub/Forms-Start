import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from '../../../node_modules/rxjs';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styles: [`
    input.ng-touched.ng-invalid {
      border: 1px solid red;
    }
  `]
})
export class ReactiveComponent implements OnInit {
  myForm: FormGroup;

  genders = [
    'männlich',
    'weiblich'
  ];

  constructor(private formBuilder: FormBuilder) { }

  onSubmit() {
    console.log(this.myForm);
  }
  onAddHobby() {
    (<FormArray>this.myForm.get('hobbies')).push( new FormControl('', Validators.required));
  }

  ngOnInit() {
    // this.myForm = new FormGroup({
    //   'userData': new FormGroup({
    //     'username': new FormControl(null, Validators.required),  // synchrone überprüfung
    //     'email': new FormControl(null, [
    //       Validators.required,
    //       Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
    //     ])
    //   }),
    //   'password': new FormControl(null, Validators.required),
    //   'gender': new FormControl('männlich'),
    //   'hobbies': new FormArray([
    //     new FormControl('Cooking', Validators.required, this.asyncExampleValidator)
    //   ])
    // });
    this.myForm = this.formBuilder.group({
      'userData': this.formBuilder.group({
        'username': this.formBuilder.control(null, [
          Validators.required,
          this.exampleValidator
        ]),
        'email': this.formBuilder.control(null, [
          Validators.required,
          Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
        ])
      }),
      'password': [null, Validators.required],
      'gender': ['männlich'],
      'hobbies': this.formBuilder.array([
        [null, Validators.required, this.asyncExampleValidator]
      ])
    });
  }

  exampleValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value === 'Example') { // ex. wenn ich example eingebe ist diese control nicht mehr valide!
      return {example : true}; // rückgabewert von [s: string] : boolean, siehe oben
    }
    return null;  // wenn null zurückgegeben, bestanden, sonst durchgefallen!
  }

  asyncExampleValidator(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>(
      (resolve, reject) => {
        setTimeout(() => {
          if (control.value === 'Example') {
            resolve({asyncExample: true}); // wenn ich was spezielles zurückgebe, dann ist es nicht valide
          } else {
            resolve(null);  // valide
          }
        }, 1500);
      }
    );
    return promise;
  }

}
