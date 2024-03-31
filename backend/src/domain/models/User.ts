export interface UserModel {
    id?: string;
    name: string;
    email: string;
    password?: string;
    role: string;
    isAuthorized: boolean;
    access_token?: string;
  }