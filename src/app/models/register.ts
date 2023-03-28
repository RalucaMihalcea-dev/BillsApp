export interface Register {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export interface RegisterResponse {
  username: string;
  token: string;
  email: string;
}
