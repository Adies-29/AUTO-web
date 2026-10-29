export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin';
}

export interface JwtPayload {
  sub: string;
  role?: string;
  exp: number;
}
