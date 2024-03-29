export interface AuthResponse {
  statusCode: number;
  message: string;
  data?: {
    token: string;
    user: {
      name: string;
      email: string;
    };
  };
}
