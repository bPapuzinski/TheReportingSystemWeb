import {HttpHeaders} from '@angular/common/http';

// export const apiURL = 'http://localhost:8080';
export const apiURL = 'https://reportingsystembackend.herokuapp.com';
export const header = new HttpHeaders({
  Authorization: localStorage.getItem('token')
});
