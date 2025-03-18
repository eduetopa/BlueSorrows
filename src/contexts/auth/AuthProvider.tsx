
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { AuthContextType, AuthState, Profile } from "./types";
import { fetchUserProfile, createUserProfile, checkUsernameExists } from "./authUtils";

const initialState: AuthState = {
  session: null,
  user: null,
  profile: null,
  loading: true
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(initialState);
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setState(prevState => ({
        ...prevState,
        session,
        user: session?.user ?? null,
        loading: false
      }));
      
      if (session?.user) {
        fetchUserProfile(session.user.id).then(profile => {
          setState(prevState => ({ ...prevState, profile }));
        });
      }
    }).catch(error => {
      console.error("Error getting session:", error);
      setState(prevState => ({ ...prevState, loading: false }));
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setState(prevState => ({
        ...prevState,
        session,
        user: session?.user ?? null,
        loading: false
      }));
      
      if (session?.user) {
        fetchUserProfile(session.user.id).then(profile => {
          setState(prevState => ({ ...prevState, profile, loading: false }));
        }).catch(error => {
          console.error("Error fetching profile:", error);
          setState(prevState => ({ ...prevState, loading: false }));
        });
      } else {
        setState(prevState => ({ ...prevState, profile: null, loading: false }));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Sign in with email/username and password
  const signIn = async (identifier: string, password: string) => {
    try {
      setState(prevState => ({ ...prevState, loading: true }));
      
      // Check if identifier is an email
      const isEmail = identifier.includes('@');
      
      if (isEmail) {
        // Sign in with email
        const { error } = await supabase.auth.signInWithPassword({
          email: identifier,
          password,
        });

        if (error) {
          throw error;
        }
      } else {
        // Sign in with username
        // First, get the email associated with this username
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('email')
          .eq('username', identifier)
          .maybeSingle();
          
        if (profileError) {
          console.error("Error fetching profile:", profileError);
          throw new Error("Error finding username");
        }
        
        if (!profileData) {
          throw new Error("Username not found");
        }
        
        // Sign in with the retrieved email
        const { error } = await supabase.auth.signInWithPassword({
          email: profileData.email,
          password,
        });
        
        if (error) {
          throw error;
        }
      }
      
      toast.success("Signed in successfully!");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Error signing in");
      console.error("Error signing in:", error);
      setState(prevState => ({ ...prevState, loading: false }));
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string, username: string) => {
    try {
      setState(prevState => ({ ...prevState, loading: true }));
      
      // Check if username is already taken
      const usernameExists = await checkUsernameExists(username);
      
      if (usernameExists) {
        throw new Error("Username already taken");
      }
      
      // Create user in auth
      const { error: signUpError, data } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        throw signUpError;
      }

      // Create profile in our profiles table
      if (data.user) {
        const profileCreated = await createUserProfile(data.user.id, email, username);
        
        if (!profileCreated) {
          // Try to delete the auth user if profile creation fails
          await supabase.auth.admin.deleteUser(data.user.id).catch(err => {
            console.error("Failed to clean up auth user after profile creation error:", err);
          });
          
          throw new Error("Error creating profile");
        }
      }

      toast.success("Account created successfully! Please sign in.");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message || "Error creating account");
      console.error("Error signing up:", error);
    } finally {
      setState(prevState => ({ ...prevState, loading: false }));
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      setState(prevState => ({ ...prevState, loading: true }));
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      toast.success("Signed out successfully");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message || "Error signing out");
      console.error("Error signing out:", error);
    } finally {
      setState(prevState => ({ ...prevState, loading: false }));
    }
  };

  const contextValue: AuthContextType = {
    ...state,
    signIn,
    signUp,
    signOut
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
