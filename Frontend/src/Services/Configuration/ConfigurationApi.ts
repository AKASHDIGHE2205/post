import axios from "axios";
import { toast } from "sonner";
import { Base_URL } from "../Transaction/TransactionsAPI";


//create new group
export const createNewGroup = async (data: any) => {
    try {
        const response = await axios.post(`${Base_URL}/newGroup`, data);
        if (response.status === 200) {
            toast.success("New Group Added Successfully");
        }
        return response.data;
    } catch (error: any) {
        throw new Error(error);
    }
}