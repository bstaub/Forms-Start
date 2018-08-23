import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styles: []
})
export class ReactiveComponent implements OnInit {
  myForm: FormGroup;

  constructor() { }

  onSubmit() {
    console.log(this.myForm);
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      'username': new FormControl(null),
      'email': new FormControl(null),
      'password': new FormControl(null),
    });
  }

}
