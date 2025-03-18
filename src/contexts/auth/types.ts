
import { Session, User } from "@supabase/supabase-js";

export interface Profile {
  id: number;
  username: string;
  email: string;
  role: string;
  created_at: string;
  stories?: number[];
  followers_id?: number[];
  following_id?: number[];
}

export interface AuthState {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
}

export interface AuthContextType extends AuthState {
  signIn: (identifier: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
}
