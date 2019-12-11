import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RegisterRequest} from '../model/register-request';
import {CustomResponse} from '../model/custom-response';

const header = new HttpHeaders({
  Authorization: localStorage.getItem('token')
});

@Injectable({providedIn: 'root'})
export class RegisterService {

  apiURL = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  registerWorker(registerRequest: RegisterRequest): Observable<CustomResponse> {
    return this.http.post<CustomResponse>(this.apiURL + '/registerWorker', registerRequest, {headers: header});
  }
}
