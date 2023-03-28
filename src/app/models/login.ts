import { Role } from './role';
export interface Login {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  accessTokenExpirationTime: string;
  userRoles: Role[];
}
