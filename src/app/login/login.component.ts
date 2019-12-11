import {Component, OnInit} from '@angular/core';
import {LoginService} from '../service/login.service';
import {FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {LoginRequest} from '../model/login-request';
import {Router} from '@angular/router';
import {RegisterWorkerCreationDialog} from '../register-worker/dialog/register-worker-creation.dialog';
import {MatDialog} from '@angular/material';
import {LoginDialog} from './dialog/login.dialog';


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  title = 'Login';
  loginForm: User;

  constructor(private loginService: LoginService,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loginForm = new User();
  }

  login(formDirective: FormGroupDirective) {
    this.loginService.login(this.loginForm.initUser()).subscribe(response => {
      localStorage.setItem('user', response.username);
      this.router.navigateByUrl('/reportList');
    }, error => {
      this.dialog.open(LoginDialog, {
        width: 'auto',
        data: { info: 'Bad Credentials', title: 'Login failed' }
      });
    });
  }
}

class User {
  username: FormControl = new FormControl(undefined, Validators.required);
  password: FormControl = new FormControl(undefined, Validators.required);
  formGroup: FormGroup = new FormGroup({init: new FormControl('')});

  constructor() {
    this.formGroup.reset();
    this.initFormGroup();
  }

  initFormGroup() {
    this.formGroup.addControl('username', this.username);
    this.formGroup.addControl('password', this.password);
  }

  initUser(): LoginRequest {
    return new LoginRequest(this.username.value, this.password.value);
  }
}
