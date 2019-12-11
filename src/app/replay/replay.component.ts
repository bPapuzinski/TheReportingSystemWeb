import {Component, Input, OnInit} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {ReportListResponse} from '../model/report-list-response';
import {FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {ReplayRequest} from '../model/replay-request';
import {ReplayService} from '../service/replay.service';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {ReplayCreationDialog} from './dialog/replay-creation-dialog';
import {ReportService} from '../service/report.service';
import {ReplayResponse} from '../model/replay-response';

@Component({
  selector: 'app-replay',
  templateUrl: './replay.component.html',
  styleUrls: ['./replay.component.css']
})
export class ReplayComponent implements OnInit {

  @Input() selectedReport: SelectionModel<ReportListResponse>;
  replayForm: Replay;
  replays = new MatTableDataSource<ReplayResponse>();
  displayedColumns = ['author', 'context', 'creationDate'];

  constructor( private  reportService: ReportService,
               private replayService: ReplayService,
               private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getListOfReplays();
    this.replayForm = new Replay();
  }

  private getListOfReplays() {
    this.reportService.getReportDetails(this.selectedReport.selected[0].id).then(response => {
      this.replays = new MatTableDataSource(response.replayList);
    });
  }

  sendReplay(formDirective: FormGroupDirective) {
    this.replayService.sendReplay(this.replayForm.initUser(), this.selectedReport.selected[0].id).subscribe(response => {
      this.dialog.open(ReplayCreationDialog, {
        width: 'auto',
        data: {
          info: 'Replay has been added to Report',
          title: 'Adding Replay'
        }
      });
      this.reload();
    }, error => {
      this.dialog.open(ReplayCreationDialog, {
        width: 'auto',
        data: {
          info: 'Replay has not been added to Report. ',
          title: 'Error'
        }
      });
    });
  }

  private reload() {
    this.getListOfReplays();
    this.replayForm = new Replay();
  }
}

class Replay {
  context: FormControl = new FormControl(undefined, Validators.required);
  formGroup: FormGroup = new FormGroup({init: new FormControl('')});

  constructor() {
    this.formGroup.reset();
    this.initFormGroup();
  }

  initFormGroup() {
    this.formGroup.addControl('context', this.context);
  }

  initUser(): ReplayRequest {
    return new ReplayRequest(localStorage.getItem('user'), this.context.value);
  }
}
