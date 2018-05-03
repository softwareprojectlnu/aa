export interface Roles {
  subscriber?: boolean,
  admin?: boolean;
}

export interface Users {
  uid?: string;
  email: string;
  roles: Roles;
}
