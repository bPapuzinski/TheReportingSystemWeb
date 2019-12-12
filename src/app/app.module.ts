import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import {CdkDetailRowDirective} from './directives/cdk-detail-row.directive'
import { AppComponent } from './app.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule,
  MatSidenavModule, MatSortModule, MatTableModule, MatTabsModule,
  MatToolbarModule, MatTooltipModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { ReportListComponent } from './report-list/report-list.component';
import {ReportDetailComponent} from './report-details/report-details.component';
import {ReplayComponent} from './replay/replay.component';
import {ReplayCreationDialog} from './replay/dialog/replay-creation-dialog';
import {ReportCloseConfirmactionDialog} from './report-list/dialog/report-close-confirmation';
import {RegisterWorkerComponent} from './register-worker/register-worker.component';
import {RegisterWorkerCreationDialog} from './register-worker/dialog/register-worker-creation.dialog';
import {LoginDialog} from './login/dialog/login.dialog';
import {UserListComponent} from './user-list/user-list.component';
import {UserDetailComponent} from './user-details/user-details.component';
import {UserChangeRoleConfirmation} from './user-details/dialog/user-change-role-confirmation';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ReplayComponent,
    CdkDetailRowDirective,
    ReportListComponent,
    ReportDetailComponent,
    RegisterWorkerComponent,
    UserListComponent,
    UserDetailComponent,
    ReplayCreationDialog,
    UserChangeRoleConfirmation,
    ReportCloseConfirmactionDialog,
    RegisterWorkerCreationDialog,
    LoginDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatSidenavModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatAutocompleteModule,
    MatTableModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatDialogModule,
    MatTooltipModule,
    MatSelectModule,
  ],
  entryComponents: [
    ReplayCreationDialog,
    ReportCloseConfirmactionDialog,
    RegisterWorkerCreationDialog,
    LoginDialog,
    UserChangeRoleConfirmation
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
