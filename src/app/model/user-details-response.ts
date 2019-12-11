import {RolesResponse} from './roles-response';

export class UserDetails {
  userId: number;
  username: string;
  email: string;
  mobileNumber: string;
  status: boolean;
  roles: RolesResponse[];
}
