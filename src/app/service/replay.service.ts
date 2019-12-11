import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ReplayRequest} from '../model/replay-request';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ReplayResponse} from '../model/replay-response';

const header = new HttpHeaders({
  Authorization: localStorage.getItem('token')
});

@Injectable({providedIn: 'root'})
export class ReplayService {

  apiURL = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  sendReplay(replayRequest: ReplayRequest, reportId: number): Observable<ReplayResponse> {
    return this.http.post<any>(this.apiURL + `/report/${reportId}/replay`, replayRequest, {headers: header});
  }
}
