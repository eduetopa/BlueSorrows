
import { supabase } from "@/integrations/supabase/client";
import { Profile } from "./types";
import { toast } from "sonner";

export const fetchUserProfile = async (userId: string): Promise<Profile | null> => {
  try {
    // Convert UUID to number
    const numericId = parseInt(userId.replace(/-/g, ''), 16);
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', numericId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }

    if (!data) {
      console.error('No profile found for the user');
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error processing user profile:', error);
    return null;
  }
};

export const createUserProfile = async (/*userId: number,*/ email: string, username: string): Promise<boolean> => {
  try {
    //const numericId = parseInt(userId.replace(/-/g, ''), 16);      #Numeric ID AutoIncremental for the profile
    
    const { error } = await supabase
      .from('profiles')
      .insert({
        //id: numericId,
        username: username,
        email: email,
        role: 'user'
      });

    if (error) {
      console.error("Error creating profile:", error);
      toast.error("Error creating user profile");
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error creating profile:", error);
    return false;
  }
};

export const checkUsernameExists = async (username: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', username)
      .maybeSingle();
      
    if (error && error.code !== 'PGRST116') {
      throw new Error("Error checking username");
    }
    
    return !!data;
  } catch (error) {
    console.error("Error checking username:", error);
    throw error;
  }
};
