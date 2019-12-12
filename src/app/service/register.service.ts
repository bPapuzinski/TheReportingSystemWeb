import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RegisterRequest} from '../model/register-request';
import {CustomResponse} from '../model/custom-response';
import {apiURL, header} from './global';

@Injectable({providedIn: 'root'})
export class RegisterService {

  constructor(private http: HttpClient) {
  }

  registerWorker(registerRequest: RegisterRequest): Observable<CustomResponse> {
    return this.http.post<CustomResponse>(apiURL + '/registerWorker', registerRequest, {headers: header});
  }
}
