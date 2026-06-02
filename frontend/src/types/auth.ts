export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  ok: boolean;
  data: {
    access_token: string;
    token_type: string;
  };
}
