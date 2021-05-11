import { useMemo } from "react";
import Axios from "axios";
import { useAuth } from "./";
import { apiEndpoint } from "../config";

export default function useAxios() {
  const { token, logout } = useAuth();

  const axios = useMemo(() => {
    const axios = Axios.create({
      baseURL: apiEndpoint,
      headers: {
        "Content-Type": "application/json",
      },
    });
    axios.interceptors.response.use(undefined, function (error) {
      const statusCode = error.response ? error.response.status : null;

      if (statusCode === 401) {
        logout();
      }

      return Promise.reject(error);
    });

    return axios;

    // eslint-disable-next-line
  }, [token]);

  return axios;
}
