import { FormEvent, useEffect, useState } from "react";
import FirmModal from "../InwardEntry/FirmModal";
import { toast } from "sonner";
import { OutwardDetails } from "../../../Services/Transaction/TransactionsAPI";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import moment from "moment";

import axios from "axios";
import PostTypeModal from "../InwardEntry/PostTypeModal";
import { handleSelectFirm, handleSelectPostType } from "../../../Features/PostEntry/PostEntrySlice";

const OutwardDetailsEntry = () => {
    const startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 2).toISOString().split('T')[0];    

    const [fromDate, setfromDate] = useState(startDate);
    const currentdate = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format
    const [toDate, settoDate] = useState(currentdate);
    const [data, setData] = useState<any>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [show, setShow] = useState(false);
    const [loading,setLoading] = useState(false);
   
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [Details, setDetails] = useState<any[]>([]);
    const {user} = useSelector((state:RootState)=>state.auth)
    const name = JSON.parse(user);
    const { firm_id, firm_name, post_name, post_id } = useSelector((state: RootState) => state.postentry);
    const dispatch = useDispatch();
    useEffect(() => {
        if (data.length > 0) {
            const formattedData = data.map((item: any) => ({

                sr_no: item.sr_no || 0,
                entry_date: moment(item.entry_date).format("YYYY/MM/DD"),
                entry_id: item.entry_id || 0,
                charges: item.charges || 0,
                rec_date: item.rec_date,
                ret: item.ret,
                rec_no: item.receipt_no || '',
                post_id: item.post_id,
                post_type: item.post_type || '',
                firm_name: item.firm_name || '',
                dept_name: item.dept_name || '',
                party_name: item.party_name || '',
                city_name: item.city_name || '',
                remark: item.remark || '',
                fr_machine: item.fr_machine || '',
                qty: item.qty || '',
                flag:item.flag || ''
            }));

            setDetails(formattedData);

            // Dispatch post_type for each item
            formattedData.forEach((item: any) => {
                dispatch(handleSelectPostType({ id: item.entry_id, name: item.post_type }));
            });
        }
    }, [data, dispatch]);

    const handleAmount = (index: number, value: any) => {
        const updateEntry = [...Details];
        updateEntry[index].charges = value;
        setDetails(updateEntry);
    };

    const handleRecNo = (index: number, value: any) => {
        const updateEntry = [...Details];
        updateEntry[index].rec_no = value;
        setDetails(updateEntry);
    };

    const handleRemark = (index:any,value:any)=>{
        const updateEntry = [...Details];
        updateEntry[index].remark = value;
        setDetails(updateEntry);

    }

    const handleBtn = (rowID: number) => {
        setSelectedIndex(rowID);
        (document.getElementById("postModal") as HTMLDialogElement).showModal();
    };

    const handlePostType = () => {
        if (selectedIndex !== null) {
            const updateEntry = Details.map((entry: any, index: number) => {
                if (index === selectedIndex) {
                    return {
                        ...entry,
                        post_type: post_name,
                        post_id: post_id,
                    };
                }
                return entry;
            });
            setDetails(updateEntry);
        }
    };
  
    useEffect(() => {
        handlePostType();
    }, [post_name]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!fromDate || !toDate) {
            toast.error("Please select date");
            return;
        }
        setLoading(true);
        setShow(true);
        let body = {
            from_date: fromDate,
            to_date: toDate,
            firm_id: firm_id || "0",
            loc_id: name.loc_id
        };

        try {
            const response = await OutwardDetails(body);
            setData(response);
            setLoading(false);
            dispatch(handleSelectFirm({id:0,name:""}))
        } catch (error) {
            toast.error("Failed to fetch data");
        }
    };


    // to update entry
    const handleUpdate = async () => {
        let body = {
            data: Details,
            loc_id:name.loc_id
        };
        console.log(body);

        try {
            const response = await axios.put("http://192.168.182.26:5003/updateOutwardDetails", body);
            if (response.status === 200) {
                toast.success(response.data.message);              
            }
            
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    };

    const filteredData = Details.filter((item: any) =>
        item.post_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.entry_id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.firm_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.dept_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.party_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.city_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // item.receipt_no.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||      

        moment(item.entry_date).format("DD/MM/YYYY").toString().includes(searchTerm.toString())

    );
    console.log(filteredData);
    
 const fallback = <h1 className="flex justify-center items-center"><span className="loading loading-spinner text-info"></span></h1>
    return (
        <>
            <div className="flex justify-center">
                <div className="overflow-x-auto w-full flex justify-center shadow-xl rounded-xl p-4 m-6">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 mb-4">
                            <div className="flex flex-col items-center md:items-start">
                                <label htmlFor="location" className="mb-2">
                                    From Date <span className="text-red-600">*</span>
                                </label>
                                <input value={fromDate} onChange={(e) => setfromDate(e.target.value)} name="fromdate" id="date" type="date" className="input input-sm input-bordered w-[320px]" />
                            </div>
                            <div className="flex flex-col items-center md:items-start">
                                <label htmlFor="date" className="mb-2">
                                    To Date <span className="text-red-600">*</span>
                                </label>
                                <input value={toDate} onChange={(e) => settoDate(e.target.value)} name="todate" id="date" type="date" className="input input-sm input-bordered w-[320px]" />
                            </div>
                            <div className="flex flex-col items-center md:items-start">
                                <label htmlFor="meet-hall" className="mb-2">
                                    Firm Name
                                </label>
                                <div className="join-item">
                                    <div className="join">
                                        <input readOnly value={firm_name} className="input input-sm input-bordered join-item" placeholder="Firm Name" />
                                        <button onClick={() => (document.getElementById("firmModal") as HTMLDialogElement).showModal()} type="button" className="btn btn-sm join-item btn-info btn-outline">Select</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center gap-4">
                            <button type="submit" className="btn btn-sm btn-outline btn-success">Continue...</button>
                        </div>
                    </form>
                </div>
            </div>


{loading ? fallback :(<>{show && (
                <>
                    <div className="flex justify-end mr-8">
                        <button onClick={handleUpdate} className="btn btn-sm btn-primary btn-outline mr-6" type="button">Update</button>
                        <div className=" ">
                            <label className="input input-bordered input-sm flex items-center w-full sm:w-auto">
                                <input
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    type="text"
                                    className="grow"
                                    placeholder="Search"
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="w-4 h-4 opacity-70"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-center items-center ">
                        <div className="overflow-x-auto w-full p-2 m-5 shadow-xl rounded-xl ">
                            <table className="table table-zebra ">
                                <thead className=" btn-sm font-bold bg-base-200 text-xs">
                                    <tr className="">
                                        <th className="hidden">Sr No</th>
                                        <th>Doc.No</th>
                                        <th>Doc.Date</th>
                                        <th>Post Type</th>
                                        <th>Firm Name</th>
                                        <th>Department</th>
                                        <th>Receiver Name</th>
                                        <th>City</th>
                                        <th>Remark</th>
                                        <th>Amount</th>
                                        <th>Rece. No</th>
                                        <th>Recevie Date</th>
                                        <th>QTY</th>
                                    </tr>
                                </thead>

                                <tbody className="text-xs">
                                    {filteredData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.entry_id}</td>
                                            <td className="hidden">{index + 1}</td>
                                            <td>{moment(item.entry_date).format("DD/MM/YYYY")}</td>
                                            <td>
                                                <input
                                                    readOnly
                                                    onClick={() => handleBtn(index)}
                                                    value={item.post_type}
                                                    name={`post_type${index}`}
                                                    type="text"
                                                    placeholder="Type here"
                                                    className="input input-bordered h-9 w-22"
                                                />

                                            </td>
                                            <td>{item.firm_name}</td>
                                            <td>{item.dept_name}</td>
                                            <td>{item.party_name}</td>
                                            <td>{item.city_name}</td>
                                            <td>
                                            <input
                                                    value={item.remark}
                                                    onChange={(e) => handleRemark(index, e.target.value)}
                                                    name="remark"
                                                    type="text"
                                                    placeholder=""
                                                    className="input input-bordered h-9 w-[6rem]"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    value={item.charges}
                                                    onChange={(e) => handleAmount(index, e.target.value)}
                                                    name="amount"
                                                    type="number"
                                                    placeholder="Type here"
                                                    className="input input-bordered h-9 w-20"
                                                />
                                            </td>
                                            <td>
                                                {/* {item.receipt_no} */}
                                                <input
                                                    defaultValue={item.rec_no}
                                                    onChange={(e) => handleRecNo(index, e.target.value)}
                                                    name="rec_no"
                                                    type="text"
                                                    placeholder="Type here"
                                                    className="input input-bordered h-9 w-22"
                                                />
                                            </td>
                                            <td>{item.rec_date}</td>
                                            <td>{item.qty}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}</>)}
            
            <PostTypeModal />
            <FirmModal />
        </>
    );
};

export default OutwardDetailsEntry;
