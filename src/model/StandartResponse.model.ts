export interface StandardResponse<T> {
  data?: T;
  statusCode: number;
  message?: string;
}
