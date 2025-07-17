import axios from "axios";

import { Base_URL } from "../Transaction/TransactionsAPI";

//get Inward/outward repoprt
export  const getInOutReport = async(data:any)=>{
    try {
        const response = await axios.post(`${Base_URL}/getInOutReports`, data);
        if (response.status === 201) {
            
            
        }
        return response.data;
    } catch (error: any) {
        throw new Error(error);
    }

}