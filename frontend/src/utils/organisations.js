import axios from "axios";
import { apiEndpoint } from "../config/index"

export const getOrg = async (token, id) => {
    const response = await axios(`${apiEndpoint}/organisations`, {
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        }
    });
    const result = response.data.filter(function (a) { return a.id == id })[0]
    return result;
};

export const getAllOrgs = async (token) => {
    try {
        const response = await axios(`${apiEndpoint}/organisations`, {
            headers: {
                "Authorization": token,
                "Content-Type": "application/json"
            }
        });
        return response.data
    } catch (err) {
        return err.response.error;
    }

};

export const createOrgs = async (data) => {
    const response = await axios.post(`${apiEndpoint}/organisations/create_join`, { "name": data.name, "hourlyRate": data.rate }, {
        headers: {
            "Authorization": data.token,
            "Content-Type": "application/json"
        }
    });

    return response.status
};

export const editOrgs = async (data) => {
    const response = await axios.put(`${apiEndpoint}/organisations/${data.id}`, { "name": data.name, "hourlyRate": data.rate }, {
        headers: {
            "Authorization": data.token,
            "Content-Type": "application/json"
        }
    });

    return response.status
};

export const joinOrg = async (token, id) => {
    const response = await axios.post(`${apiEndpoint}/organisations/join`, { "organisationId": id }, {
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        },
    });
    return response.status;
};

export const leaveOrg = async (token) => {
    const response = await axios.post(`${apiEndpoint}/organisations/leave`, { userId: 1 }, {
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        },
    });
    return response.status;
};
