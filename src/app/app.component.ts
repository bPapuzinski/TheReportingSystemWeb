import {Component} from '@angular/core';
import {LoginService} from './service/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'reportingSystemWeb';
  private roles: string[];

  constructor(private loginService: LoginService,
              private router: Router) {
  }

  public logout() {
    this.loginService.logout();
    this.router.navigateByUrl('');
  }

  public get logged() {
    return this.loginService.isLoggedIn();
  }

  public getAuthorities() {
    this.roles = this.loginService.getAuthorities();
    return this.roles;
  }
}
