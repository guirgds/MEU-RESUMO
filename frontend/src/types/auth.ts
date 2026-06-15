export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  bio: string | null;
  avatarUrl: string | null;
};

export type AuthResponse = {
  user: User;
  token: string;
};
