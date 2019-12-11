import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ReportListComponent} from './report-list/report-list.component';
import {RegisterWorkerComponent} from './register-worker/register-worker.component';
import {UserListComponent} from './user-list/user-list.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'userList',
    component: UserListComponent
  },
  {
    path: 'reportList',
    component: ReportListComponent
  },
  {
    path: 'registerWorker',
    component: RegisterWorkerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
