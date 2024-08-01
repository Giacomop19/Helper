import React from "react";
import { useStorageState } from "./useStorageState";


const cli = process.env.CLIENT
const AuthContext = React.createContext<{
  signIn: (data:any) => void;
  signOut: () => void;
  isLoading: boolean;
  session?: string | null;
  token? : string | null;
}>({
  signIn: () => null,
  signOut: () => null,
  isLoading: false,
  session: null,
  token: null
});


// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [[t, token], setToken] = useStorageState("token")
  return (
    <AuthContext.Provider
      value={{
        signIn: async (data) => {
          try {
            setToken(data.data.data);
          }
          catch (err){
            console.error(err)
          }
        },
        signOut: () => {
          setToken(null)
        },
        isLoading: isLoading,
        token: token
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}