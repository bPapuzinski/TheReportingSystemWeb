import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {RolesResponse} from '../model/roles-response';
import {apiURL, header} from './global';


@Injectable({providedIn: 'root'})
export class RoleService {

  constructor(private http: HttpClient) {
  }

  getRolesList(): Promise<RolesResponse[]> {
    return this.http.get<RolesResponse[]>(apiURL + '/role', {headers: header}).toPromise();
  }
}
