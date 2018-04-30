import {s} from '@angular/core/src/render3';

export interface Roles {
  USER,
  MANAGER,
  ADMIN,
  admin?: boolean;
}
/*
export class User {
  email: string;
  password: string;
  roles: Roles;
  role: string;

  constructor(authData) {
    this.email = authData.email;
      this.password = authData.password;
    // this.roles = { admin: false};
  }
}
*/
export interface Users {
  uid?: string;
  email: string;
  name: string;
  isAdmin?: boolean;
 // roles: Roles;
  role: string;
}
