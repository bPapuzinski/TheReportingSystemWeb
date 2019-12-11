import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ReportListResponse} from '../model/report-list-response';
import {Injectable} from '@angular/core';
import {ReportDetails} from '../model/report-details-response';
import {CustomResponse} from '../model/custom-response';

const header = new HttpHeaders({
  Authorization: localStorage.getItem('token')
});

@Injectable({providedIn: 'root'})
export class ReportService {

  apiURL = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  getReportList(): Observable<ReportListResponse[]> {
    return this.http.get<any>(this.apiURL + '/report', {headers: header});
  }

  getReportDetails(id: number): Promise<ReportDetails> {
    return this.http.get<ReportDetails>(this.apiURL + `/report/${id}`, {headers: header}).toPromise();
  }

  closeReport(id: number): Observable<CustomResponse> {
    return this.http.put<CustomResponse>(this.apiURL + `/report/${id}` , null, {headers: header});
  }
}
