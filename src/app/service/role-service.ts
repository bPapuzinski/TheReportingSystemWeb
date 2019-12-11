import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RolesResponse} from '../model/roles-response';

const header = new HttpHeaders({
  Authorization: localStorage.getItem('token')
});

@Injectable({providedIn: 'root'})
export class RoleService {

  apiURL = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  getRolesList(): Promise<RolesResponse[]> {
    return this.http.get<RolesResponse[]>(this.apiURL + '/role', {headers: header}).toPromise();
  }
}
