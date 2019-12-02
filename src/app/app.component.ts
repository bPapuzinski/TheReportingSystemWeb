import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reportingSystemWeb';

  public logout() {
    // this.oauthService.logOut()
  }

  public get logged() {
    // return this.oauthService.hasValidAccessToken();
    return true;
  }
}
