export interface IUserAdmin {
  name?: string;
  userType?: UserType;
}

export interface IUserDbFilter {
  name?: string;
  admin?: boolean;
}

export enum UserType {
  user = 'user',
  admin = 'admin'
}

