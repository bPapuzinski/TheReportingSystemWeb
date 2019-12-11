import {Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {FormControl} from '@angular/forms';
import { merge, of as observableOf, Observable } from 'rxjs';
import {CdkDetailRowDirective} from '../directives/cdk-detail-row.directive';
import {HttpClient} from '@angular/common/http';
import {SelectionModel} from '@angular/cdk/collections';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {ReportListResponse} from '../model/report-list-response';
import {ReportService} from '../service/report.service';
import {ReplayCreationDialog} from '../replay/dialog/replay-creation-dialog';
import {ReportCloseConfirmactionDialog} from './dialog/report-close-confirmation';


@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('void', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('*', style({height: '*', visibility: 'visible'})),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class ReportListComponent implements OnInit {
  title = 'Report List';
  reports = new MatTableDataSource<ReportListResponse>();
  resultsLength = 0;
  selectedReport: SelectionModel<ReportListResponse>;
  displayedColumns = ['city', 'creationDate', 'active', 'action'];
  filter = new FormControl();
  filteredValues: Observable<string[]>;
  openedRow: CdkDetailRowDirective;

   @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private http: HttpClient,
              private reportService: ReportService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.selectedReport = new SelectionModel<ReportListResponse>(false, []);
    this.refreshPlatformListViaApi();
    this.filteredValues = this.filter.valueChanges
      .pipe(
        startWith(''),
        map(value => this.getFilteredValues(value))
      );
  }
  closeReport(id: number) {
    this.reportService.closeReport(id).subscribe(response => {
      this.dialog.open(ReportCloseConfirmactionDialog, {
        width: 'auto',
        data: {
          info: 'Report has been ' + response.message,
          title: 'Changing report'
        }
      });
      this.refreshPlatformListViaApi();
    }, error => {
      this.dialog.open(ReportCloseConfirmactionDialog, {
        width: 'auto',
        data: {
          info: 'Report has not been closed. ',
          title: 'Error'
        }
      });
    });
  }

  private initDataSource() {
    this.reports.filterPredicate = (data: any, filter: string) => this.filterValues(data, filter);
    this.reports.sortingDataAccessor = (item, property) => {
          return item[property];
    };
    this.reports.sort = this.sort;
  }

  private getFilteredValues(value: string): string[] {
    return (this.reports.data as ReportListResponse[])
      .filter(report => report.city.includes(value))
      .map(report => report.city);
  }

  private filterValues(data: any, filter: string) {
    const keyList = [];
    return data.city.small().indexOf(filter) !== -1
      || String(data.active).indexOf(filter) !== -1
      || data.creationDate.small().indexOf(filter) !== -1;
  }

  private refreshPlatformListViaApi() {
    merge(this.sort.sortChange)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.reportService.getReportList();
        }),
        map(data => {
          this.resultsLength = data.length;
          return data;
        }),
        catchError(() => {
          return observableOf([]);
        })
      ).subscribe(data => {
      this.reports = new MatTableDataSource(data);
      this.initDataSource();
    });
  }

  select(report: ReportListResponse): void {
    this.selectedReport.select(report);
  }

  refreshReportList(filter?) {
    if (filter) {
      this.reports.filter = filter;
      this.resultsLength = this.reports.filteredData.length;
    } else {
      this.refreshPlatformListViaApi();
    }
  }

  onToggleChange(cdkDetailRow: CdkDetailRowDirective): void {
    if (this.openedRow && this.openedRow.expanded) {
      this.openedRow.toggle();
    }
    this.openedRow = cdkDetailRow.expanded ? cdkDetailRow : undefined;
  }
}
