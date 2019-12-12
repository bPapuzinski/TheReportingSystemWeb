import {Component, Input, OnInit} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {FormControl, Validators} from '@angular/forms';
import {UserListResponse} from '../model/user-list-response';
import {UserService} from '../service/user.service';
import {UserDetails} from '../model/user-details-response';
import {RolesResponse} from '../model/roles-response';
import {RoleService} from '../service/role-service';
import {MatDialog} from '@angular/material';
import {UserChangeRoleConfirmation} from './dialog/user-change-role-confirmation';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input() selectedUser: SelectionModel<UserListResponse>;
  userForm: User;
  userDetails: UserDetails;
  roles: RolesResponse[];
  previousFieldValue: number;

  constructor(private userService: UserService,
              private roleService: RoleService,
              private dialog: MatDialog) {
  }

  async ngOnInit(): Promise<void> {
    const simpleUser: UserListResponse = this.selectedUser.selected[0];
    this.userDetails = await this.userService.getUserDetails(simpleUser.username);
    this.userForm = new User(this.userDetails);
    this.roles = await this.roleService.getRolesList();
  }

  editField(field: FormControl) {
    field.enable();
    this.previousFieldValue = field.value;
  }

  async reload() {
    this.userDetails = await this.userService.getUserDetails(this.selectedUser.selected[0].username);
    this.userForm = new User(this.userDetails);
  }

  acceptEdit(field: FormControl) {
    this.userService.changeUserRole(this.userDetails.username, field.value).subscribe(response => {
      this.reload();
    }, error => {
      this.dialog.open(UserChangeRoleConfirmation, {
        width: 'auto',
        data: {
          info: 'Role has not been changed. ' + error.error.message,
          title: 'Changing role'
        }
      });
    });
    this.reload();
    field.disable();
  }

  cancelEdit(field: FormControl) {
    field.setValue(this.previousFieldValue);
    field.disable();
  }
}

class User {
  userId: FormControl;
  username: FormControl;
  email: FormControl;
  mobileNumber: FormControl;
  status: FormControl;
  roles: FormControl;

  constructor(private userDetails: UserDetails) {
    this.userId = new FormControl({value: userDetails.userId, disabled: true}, Validators.required);
    this.username = new FormControl({value: userDetails.username, disabled: true}, Validators.required);
    this.email = new FormControl({value: userDetails.email, disabled: true}, Validators.required);
    this.mobileNumber = new FormControl({value: userDetails.mobileNumber, disabled: true}, Validators.required);
    this.status = new FormControl({value: userDetails.status, disabled: true}, Validators.required);
    this.roles = new FormControl({value: userDetails.roles[0].id, disabled: true}, Validators.required);
  }
}
