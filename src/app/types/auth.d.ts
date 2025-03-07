export interface UserProfile {
  id: string;
  email: string;
  name: string;
  // Add other user fields as needed
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthContextType {
  user: UserProfile | null;
  logout: () => void;
  loading: boolean;
}