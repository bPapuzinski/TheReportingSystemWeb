import {Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {FormControl} from '@angular/forms';
import {UserListResponse} from '../model/user-list-response';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../service/user.service';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {merge, Observable, of as observableOf} from 'rxjs';
import {CdkDetailRowDirective} from '../directives/cdk-detail-row.directive';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('void', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('*', style({height: '*', visibility: 'visible'})),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class UserListComponent implements OnInit {

  title = 'User List';
  users = new MatTableDataSource<UserListResponse>();
  resultsLength = 0;
  selectedUser: SelectionModel<UserListResponse>;
  displayedColumns = ['username', 'email', 'active'];
  filter = new FormControl();
  filteredValues: Observable<string[]>;
  openedRow: CdkDetailRowDirective;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private http: HttpClient,
              private userService: UserService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.selectedUser = new SelectionModel<UserListResponse>(false, []);
    this.refreshPlatformListViaApi();
    this.filteredValues = this.filter.valueChanges
      .pipe(
        startWith(''),
        map(value => this.getFilteredValues(value))
      );
  }

  private initDataSource() {
    this.users.filterPredicate = (data: any, filter: string) => this.filterValues(data, filter);
    this.users.sortingDataAccessor = (item, property) => {
      return item[property];
    };
    this.users.sort = this.sort;
  }

  private getFilteredValues(value: string): string[] {
    return (this.users.data as UserListResponse[])
      .filter(user => user.username.includes(value))
      .map(user => user.username);
  }

  private filterValues(data: any, filter: string) {
    const keyList = [];
    return data.username.small().indexOf(filter) !== -1
      || String(data.active).indexOf(filter) !== -1
      || data.email.small().indexOf(filter) !== -1;
  }

  private refreshPlatformListViaApi() {
    merge(this.sort.sortChange)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.userService.getUserList();
        }),
        map(data => {
          this.resultsLength = data.length;
          return data;
        }),
        catchError(() => {
          return observableOf([]);
        })
      ).subscribe(data => {
      this.users = new MatTableDataSource(data);
      this.initDataSource();
    });
  }

  select(user: UserListResponse): void {
    this.selectedUser.select(user);
  }

  refreshUsersList(filter?) {
    if (filter) {
      this.users.filter = filter;
      this.resultsLength = this.users.filteredData.length;
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
