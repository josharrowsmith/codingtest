import axios from "axios";
import { apiEndpoint } from "../config"

export const getShifts = async (token) => {
    const response = await axios(`${apiEndpoint}/shifts`, {
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        }
    });

    return response.data
};

export const createShifts = async (data) => {
    const shift = {
        userId: data.me,
        date: data.shiftDate,
        start: data.start,
        finish: data.finish
    }

    const response = await axios.post(`${apiEndpoint}/shifts`, shift, {
        headers: {
            "Authorization": data.token,
            "Content-Type": "application/json"
        }
    });

    return response.status
};

export const deleteShift = async (data) => {
    const response = await axios.delete(`${apiEndpoint}/shifts/${data.id}`, {
        headers: {
            "Authorization": data.token,
            "Content-Type": "application/json"
        }
    });

    return response.status
};

