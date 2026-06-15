declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        username: string;
        email: string;
        bio: string | null;
        avatarUrl: string | null;
      };
    }
  }
}

export {};
