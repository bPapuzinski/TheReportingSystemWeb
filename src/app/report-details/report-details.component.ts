import {Component, Input, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ReportDetails} from '../model/report-details-response';
import {SelectionModel} from '@angular/cdk/collections';
import {ReportListResponse} from '../model/report-list-response';
import {ReportService} from '../service/report.service';
import {ReplayResponse} from '../model/replay-response';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.css']
})
export class ReportDetailComponent implements OnInit {

  @Input() selectedReport: SelectionModel<ReportListResponse>;
  reportForm: Report;
  reportDetails: ReportDetails;
  imageSrc: any

  constructor(private reportService: ReportService,
              private sanitizer: DomSanitizer) {
  }

  async ngOnInit(): Promise<void> {
    const simapleReport: ReportListResponse = this.selectedReport.selected[0];
    this.reportDetails = await this.reportService.getReportDetails(simapleReport.id);
    this.reportForm = new Report(this.reportDetails);
    this.image();
  }

  image() {
    this.imageSrc = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64, ' + this.reportDetails.image);
  }
}

class Report {
  description: FormControl;
  id: FormControl;
  image: FormControl;
  street: FormControl;
  houseNumber: FormControl;
  city: FormControl;
  coordinate: FormControl;
  active: FormControl;
  authorId: FormControl;
  creationDate: FormControl;
  replayList: FormControl;

  constructor(private reportDetails: ReportDetails) {
    this.description = new FormControl({value: reportDetails.description, disabled: true}, Validators.required);
    this.id = new FormControl({value: reportDetails.id, disabled: true}, Validators.required);
    this.image = new FormControl({value: '', disabled: true}, Validators.required);
    this.street = new FormControl({value: reportDetails.street, disabled: true}, Validators.required);
    this.houseNumber = new FormControl({value: reportDetails.houseNumber, disabled: true}, Validators.required);
    this.city = new FormControl({value: reportDetails.city, disabled: true}, Validators.required);
    this.coordinate = new FormControl({value: reportDetails.coordinate, disabled: true}, Validators.required);
    this.active = new FormControl({value: reportDetails.active, disabled: true}, Validators.required);
    this.authorId = new FormControl({value: reportDetails.authorId, disabled: true}, Validators.required);
    this.creationDate = new FormControl({value: reportDetails.creationDate, disabled: true}, Validators.required);
    this.replayList = new FormControl({value: reportDetails.replayList, disabled: true}, Validators.required);
  }
}
