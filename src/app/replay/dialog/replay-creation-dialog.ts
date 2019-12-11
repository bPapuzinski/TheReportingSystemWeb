import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'replay-creation-dialog',
  templateUrl: './replay-creation-dialog.html',
})
export class ReplayCreationDialog {
  constructor(
    public dialogRef: MatDialogRef<ReplayCreationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: string) {}
}
