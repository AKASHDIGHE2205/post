import axios from "axios";
export const Base_URL = "http://192.168.179.23:5002";


//get department
export const getDepartment = async () => {
    try {
        const response = await axios.get(`${Base_URL}/getDepts`);

        return response.data;

    } catch (error: any) {
        throw new Error(error);
    }
}

export const getFirm = async () => {
    try {
        const response = await axios.get(`${Base_URL}/getFirms`);
        return response.data;
    } catch (error: any) {
        throw new Error(error);
    }
}

//post entry

export const postEntry = async (data: any) => {
    try {
        const response = await axios.post(`${Base_URL}/newEntry`, data);
        return response.data;
    } catch (error: any) {
        throw new Error(error);
    }
}


//get post type
export const getPostType = async () => {
    try {
        const response = await axios.get(`${Base_URL}/getPTypes`);
        return response.data;
    } catch (error: any) {
        throw new Error(error);
    }
}

// get names
export const getNames = async () => {
    try {
        const response = await axios.get(`${Base_URL}/getPartyNames`);
        return response.data;
    } catch (error: any) {
        throw new Error(error);
    }
}

