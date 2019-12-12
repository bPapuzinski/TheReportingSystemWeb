import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserListResponse} from '../model/user-list-response';
import {UserDetails} from '../model/user-details-response';
import {apiURL, header} from './global';

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUserList(): Observable<UserListResponse[]> {
    return this.http.get<UserListResponse[]>(apiURL + '/user', {headers: header});
  }

  getUserDetails(username: string): Promise<UserDetails> {
    return this.http.get<UserDetails>(apiURL + `/user/${username}`, {headers: header}).toPromise();
  }

  changeUserRole(username: string, roleId: number): Observable<UserDetails> {
    return this.http.put<UserDetails>(apiURL + `/user/${username}/role/${roleId}`, null, {headers: header});
  }
}
