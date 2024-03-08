export interface UserData {
  name: string;
  email: string;
  password: string;
}

export interface UserDataContract {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  isAuthorized: boolean;
}

export interface UseDataResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  isAuthorized: boolean;
}

export interface UserContractInput {
  name: string;
  email: string;
  password: string;
}

export interface AuthPayload {
  email: string;
  password: string;
}
