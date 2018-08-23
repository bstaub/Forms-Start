import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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

  constructor() { }

  onSubmit() {
    console.log(this.myForm);
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      'username': new FormControl(null, Validators.required),  // synchrone überprüfung
      'email': new FormControl(null, [
        Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]),
      'password': new FormControl(null, Validators.required),
    });
  }

}
