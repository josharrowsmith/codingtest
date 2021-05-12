import { createContext, useContext, useMemo, useEffect, useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { apiEndpoint } from "../config";
import { AuthService } from "../utils";
import { getUser } from "../utils/users"


export const AuthContext = createContext({});
const Auth = new AuthService();

export function AuthProvider({ initialState = {}, ...props }) {
  const auth = Auth.getAuth() || {};
  const [authData, setAuthData] = useState();
  const { user, token, error } = authData || initialState || {};

  useEffect(() => {
    if (auth.token) {
      setAuthData(auth);
    }

    // eslint-disable-next-line
  }, [auth.token]);

  const { mutate: loginMutate, isLoading, isError, data, reset } = useMutation(
    (data) => axios.post(`${apiEndpoint}/auth/login`, data),
    {
      onSuccess: async (data, variables, contextValue) => {
        const user = await getUser(data.data.sessionId)
        const info = {
          token: data?.data?.sessionId ?? "",
          user
        };

        Auth.setAuth(info);
        setAuthData(info);
      },

      // server message
      onError: (data) => {
        const info = {
          error: data.response.data.error
        };
        Auth.setAuth(info);
        setAuthData(info);
      }
    }
  );

  // refactor later
  const { mutate: signupMutate } = useMutation(
    (data) => axios.post(`${apiEndpoint}/auth/signup`, data),
    {
      onSuccess: async (data, variables, contextValue) => {
        const user = await getUser(data.data.sessionId)
        const info = {
          token: data?.data?.sessionId ?? "",
          user
        };
        Auth.setAuth(info);
        setAuthData(info);
      },
      onError: (data) => {
        console.log(data)
      }
    }
  );


  const login = data => {
    loginMutate(data);
  };

  const signup = data => {
    signupMutate(data)
  }

  const logout = () => {
    Auth.removeAuth();
    setAuthData({});
  };

  const contextValue = useMemo(
    () => ({
      isAuth: !!token,
      token: token,
      user: user,
      error: error,
      isLoading: isLoading,
      login: login,
      signup: signup,
      logout: logout,
    }),

    // eslint-disable-next-line
    [user, token, isLoading]
  );

  return <AuthContext.Provider value={contextValue} {...props} />;
}

export default function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}
