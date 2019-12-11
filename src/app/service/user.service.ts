import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserListResponse} from '../model/user-list-response';
import {UserDetails} from '../model/user-details-response';

const header = new HttpHeaders({
  Authorization: localStorage.getItem('token')
});

@Injectable({providedIn: 'root'})
export class UserService {

  apiURL = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  getUserList(): Observable<UserListResponse[]> {
    return this.http.get<UserListResponse[]>(this.apiURL + '/user', {headers: header});
  }

  getUserDetails(username: string): Promise<UserDetails> {
    return this.http.get<UserDetails>(this.apiURL + `/user/${username}`, {headers: header}).toPromise();
  }
}
