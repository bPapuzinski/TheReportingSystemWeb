import {Component} from '@angular/core';
import {LoginService} from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'reportingSystemWeb';
  private roles: string[];

  constructor(private loginService: LoginService) {
  }

  public logout() {
    console.log(this.loginService.logout());
    this.loginService.logout();
  }

  public get logged() {
    console.log(this.loginService.isLoggedIn());
    return this.loginService.isLoggedIn();
  }

  public getAuthorities() {
    this.roles = this.loginService.getAuthorities();
    return this.roles;
  }
}
