export interface JwtPayload {
    sub: string;
    username: string;
    type?: string;
    iat?: number;
    exp?: number;
}
  