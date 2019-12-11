import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'register-worker-creation-dialog',
  templateUrl: './register-worker-creation.dialog.html',
})
export class RegisterWorkerCreationDialog {
  constructor(
    public dialogRef: MatDialogRef<RegisterWorkerCreationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: string) {}
}
