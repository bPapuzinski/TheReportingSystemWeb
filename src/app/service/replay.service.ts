import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ReplayRequest} from '../model/replay-request';
import {HttpClient} from '@angular/common/http';
import {ReplayResponse} from '../model/replay-response';
import {apiURL, header} from './global';

@Injectable({providedIn: 'root'})
export class ReplayService {



  constructor(private http: HttpClient) {
  }

  sendReplay(replayRequest: ReplayRequest, reportId: number): Observable<ReplayResponse> {
    return this.http.post<any>(apiURL + `/report/${reportId}/replay`, replayRequest, {headers: header});
  }
}
