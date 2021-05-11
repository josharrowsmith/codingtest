import axios from "axios";
import { apiEndpoint } from "../config"

export const getUser = async (token) => {
    const response = await axios(`${apiEndpoint}/users/me`, {
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        }
    });

    return response.data
};

export const getAllUsers = async (token) => {
    const response = await axios(`${apiEndpoint}/users/`, {
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        }
    });
    return response.data
};

