import axios from "axios";
import moment from "moment";

import { toast } from "sonner";

export const Base_URL = "http://192.168.179.23:5003";

// inward Entry
// export const InwardEntry = async () => {
//     try {
//         const response = await axios.post(`${Base_URL}`);
//         return response.data;
//     } catch (error: any) {
//         throw new Error(error);

//     }
// }




//inwardEntry View
export const getAllInView = async (data:any) => {
    let body = {
        entry_date:data.date,
        loc_id:data.loc_id

    }
    try {
        const response = await axios.post(`${Base_URL}/getAllInEntry`,body);
        return response.data;
    } catch (error: any) {
        throw new Error(error);
    }
}

//Outward Entry
export const getAllOutView = async (data:any) => {
    let body = {
        entry_date:data.date,
        loc_id:data.loc_id
    }
    try {
        const response = await axios.post(`${Base_URL}/getAllOutEntry`,body);
        return response.data;
    } catch (error: any) {
        throw new Error(error);
    }
}





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


//edit inwardentry
export const editInwardEntry = async (data: any) => {
    try {
        const response = await axios.put(`${Base_URL}/updateInEntry`, data);
        if (response.status === 200) {
            toast.success("Inward Entry Updated Successfully");
        }
        return response.data;
    } catch (error: any) {
        throw new Error(error);
    }
}

//edit outwardentry
export const editOutwardEntry = async (data: any) => {
    try {
        const response = await axios.put(`${Base_URL}/updateOutEntry`, data);
        if (response.status === 200) {
            toast.success("Outward Entry Updated Successfully");
        }
        return response.data;
    } catch (error: any) {
        throw new Error(error);
    }
}
//delete inwardOUtentry

export const EditEntry = async (item: any) => {
    let body = {
        entry_id: item.item.entry_id,
        flag: item.item.flag,
        entry_date:moment(item.item.entry_date).format("YYYY/MM/DD"),
        status:"I",
        loc_id:item.loc_id

    }

    try {
        const response = await axios.put(`${Base_URL}/delInOutEntry`, body);
        return response.data;
    } catch (error: any) {
        throw new Error(error);

    }

}



//inwardpost entry

export const postEntry = async (data: any) => {
    try {
        const response = await axios.post(`${Base_URL}/newEntry`, data);
        if (response.status === 201) {
            toast.success(response.data.message);

        }
        return response.data;
    } catch (error: any) {
        throw new Error(error);
    }
}
// post outward entry
export const postOutEntry = async (data: any) => {
    try {
        const response = await axios.post(`${Base_URL}/newOutEntry`, data);
        if (response.status === 201) {
            toast.success(response.data.message);
        }
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


//stamp entry view
export const getStamps = async () => {
    try {
        const response = await axios.get(`${Base_URL}/getAllStampEntry`);
        return response.data;
    } catch (error: any) {
        throw new Error(error);
    }
}

//post stmamp entry
export const postStampEntry = async (data: any) => {
    try {
        const response = await axios.post(`${Base_URL}/newStampEntry`, data);
        if (response.status === 201) {
            toast.success("Stamp Entry Added Successfully");
        }
        return response.data;
    } catch (error: any) {
        throw new Error(error);
    }
}
//edit stamp entry
export const editStampEntry = async (data: any) => {
    try {
        const response = await axios.put(`${Base_URL}/updateStampEntry`, data);
        if (response.status === 200) {
            toast.success("Stamp Entry Updated Successfully");
        }
        return response.data;
    } catch (error: any) {
        throw new Error(error);
    }
}
export const DeleteStampEntry = async (id: any) => {

    try {
        const response = await axios.delete(`${Base_URL}/delStampEntry/${id}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error);


    }

}






//post voucher entry
export const postVoucherEntry = async (data: any) => {
    try {
        const response = await axios.post(`${Base_URL}/newVoucherEntry`, data);
        if (response.status === 201) {
            toast.success("Voucher Entry Added Successfully");
        }
        return response.data;
    } catch (error: any) {
        throw new Error(error);
    }
}


//voucher view
export const getVoucher = async () => {
    try {
        const response = await axios.get(`${Base_URL}/getAllVoucherEntry`);
        return response.data;
    } catch (error: any) {
        throw new Error(error);
    }
}

// edit voucherentry
export const editVoucherEntry = async (data: any) => {
    try {
        const response = await axios.put(`${Base_URL}/updateVEntry`, data);
        if (response.status === 200) {
            toast.success("Voucher Entry Updated Successfully");
        }
        return response.data;
    } catch (error: any) {
        throw new Error(error);
    }
}

export const DeleteVoucherEntry = async (id: any) => {

    try {
        const response = await axios.delete(`${Base_URL}/delVEntry/${id}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error);


    }

}




//outwardDetailsEntry 
export const OutwardDetails = async (data: any) => {
    try {
        const response = await axios.post(`${Base_URL}/getAllOutwardDetails`, data);
        return response.data;
    } catch (error: any) {
        throw new Error(error);
    }
}
// update outward details

export const updateOutwardDetails = async (data: any) => {
    try {
        const response = await axios.put(`${Base_URL}/updateEntry`, data);
        return response.data;
    } catch (error: any) {
        throw new Error(error);
    }
}




