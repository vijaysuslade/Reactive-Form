import { Component, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { Observable, interval, observable } from 'rxjs'
import { map, filter } from 'rxjs/operators'
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MustMatch } from './_helper/Pass_Must_Match';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
    }, {

      validators: MustMatch('password', 'confirmPassword')
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    // display form values on success
    console.log(this.registerForm.value)
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
