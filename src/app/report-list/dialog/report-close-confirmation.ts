import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'report-close-confirmation-dialog',
  templateUrl: './report-close-confirmation.html',
})
export class ReportCloseConfirmactionDialog {
  constructor(
    public dialogRef: MatDialogRef<ReportCloseConfirmactionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: string) {}
}
