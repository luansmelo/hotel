export interface UserData {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
}

export interface UserDataContract {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface UseDataResponse {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface UserContractInput {
  name: string;
  email: string;
  password: string;
}

export interface UserLoginInput {
  email: string;
  password: string;
}
