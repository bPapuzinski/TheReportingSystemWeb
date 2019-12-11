import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {LoginRequest} from '../model/login-request';
import {Observable} from 'rxjs';
import {LoginResponse} from '../model/login-response';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({providedIn: 'root'})
export class LoginService {

  apiURL = 'http://localhost:8080';
  helper = new JwtHelperService();

  constructor(private http: HttpClient) {
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<any>(this.apiURL + '/login', loginRequest, {observe: 'response'}).pipe(
      map(response => {
        localStorage.setItem('token', response.headers.get('authorization'));
        return response.body;
      })
    );
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  public isLoggedIn() {
    return !this.helper.isTokenExpired(localStorage.getItem('token'));
  }

  public getAuthorities() {
    if (localStorage.getItem('token') != null) {
      return this.helper.decodeToken(localStorage.getItem('token')).rol;
    } else {
      return [''];
    }
  }
}
