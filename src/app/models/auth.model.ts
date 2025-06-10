export interface LoginPayloadTypes {
  username: string;
  password: string;
  expiresInMins?: number;
}

export interface LoginResponseTypes {
  username: string;
  email: string;
  token: string;
  accessToken: string;
  refreshToken: string;
  id: string;
  image: string;
}
