import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {RegisterService} from '../service/register.service';
import {RegisterRequest} from '../model/register-request';
import {RegisterWorkerCreationDialog} from './dialog/register-worker-creation.dialog';
import {MatDialog} from '@angular/material';


@Component({
  templateUrl: './register-worker.component.html',
  styleUrls: ['./register-worker.component.css']
})

export class RegisterWorkerComponent implements OnInit {
  title = 'Register Worker';
  registerForm: Worker;

  constructor(private registerService: RegisterService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.registerForm = new Worker();
  }

  registerWorker(formDirective: FormGroupDirective) {
    this.registerService.registerWorker(this.registerForm.initUser()).subscribe(response => {
      this.dialog.open(RegisterWorkerCreationDialog, {
        width: 'auto',
        data: { info: 'New account has been created', title: 'Creating Worker' }
      });
      this.reload();
    }, error => {
      if (error.error.message === 'Not unique Username') {
          this.registerForm.username.setErrors({
            notUnique: true
          });
      }
      if (error.error.message === 'Not unique Email') {
        this.registerForm.email.setErrors({
          notUnique: true
        });
      }
    });
  }

  reload() {
   this.registerForm = new Worker();
  }
}

class Worker {
  username: FormControl = new FormControl(undefined, Validators.required);
  password: FormControl = new FormControl(undefined, Validators.required);
  email: FormControl = new FormControl(undefined, Validators.required);
  mobileNumber: FormControl = new FormControl(undefined, Validators.required);
  formGroup: FormGroup = new FormGroup({init: new FormControl('')});

  constructor() {
    this.formGroup.reset();
    this.initFormGroup();
  }

  initFormGroup() {
    this.formGroup.addControl('username', this.username);
    this.formGroup.addControl('password', this.password);
    this.formGroup.addControl('email', this.email);
    this.formGroup.addControl('mobileNumber', this.mobileNumber);
  }

  initUser(): RegisterRequest {
    return new RegisterRequest(this.username.value, this.password.value, this.email.value, this.mobileNumber.value);
  }
}
