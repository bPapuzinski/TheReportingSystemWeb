import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'user-change-role-confirmation-dialog',
  templateUrl: './user-change-role-confirmation.html',
})
export class UserChangeRoleConfirmation {
  constructor(
    public dialogRef: MatDialogRef<UserChangeRoleConfirmation>,
    @Inject(MAT_DIALOG_DATA) public data: string) {}
}
