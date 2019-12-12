import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ReportListResponse} from '../model/report-list-response';
import {Injectable} from '@angular/core';
import {ReportDetails} from '../model/report-details-response';
import {CustomResponse} from '../model/custom-response';
import {apiURL, header} from './global';

@Injectable({providedIn: 'root'})
export class ReportService {

  constructor(private http: HttpClient) {
  }

  getReportList(): Observable<ReportListResponse[]> {
    return this.http.get<any>(apiURL + '/report', {headers: header});
  }

  getReportDetails(id: number): Promise<ReportDetails> {
    return this.http.get<ReportDetails>(apiURL + `/report/${id}`, {headers: header}).toPromise();
  }

  closeReport(id: number): Observable<CustomResponse> {
    return this.http.put<CustomResponse>(apiURL + `/report/${id}` , null, {headers: header});
  }
}
