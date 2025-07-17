import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DeptModal from "./DeptModal";
import FirmModal from "./FirmModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { postEntry } from "../../../Services/Transaction/TransactionsAPI";

import PostTypeModal from "./PostTypeModal";
import { handlePartyNames, handleSelectDept, handleSelectFirm, handleSelectPostType } from "../../../Features/PostEntry/PostEntrySlice";
import { toast } from "sonner";

const InwardEntry = () => {
    const currentdate = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format
    const [Inputs, setInputs] = useState({
        inwardDate: currentdate,
        posttype: "",
        name:"",
        city: "",
        remark: "",
        reciptno: "",
        qty: "",

    });
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const {user} = useSelector((state:RootState)=>state.auth);
  const name = JSON.parse(user);
  
  
    const { dept_id, dept_name, firm_id, firm_name, post_id, post_name, } = useSelector((state: RootState) => state.postentry)
    const handleInput = (e: any) => {
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value });

    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if ( !Inputs.inwardDate || !Inputs.remark || !firm_id||  !dept_id ) {                     
              toast.error("All fields are required. Please fill them out.")
            return; 
            
        }
        let body = {
            flag: "I",
            status:"A",
            entry_date: Inputs.inwardDate,
            post_type: post_id,
            dept_id: dept_id,
            firm_id: firm_id,
            party_name:Inputs.name,
            city_name:Inputs.city,         
            remark: Inputs.remark,
            receipt_no: Inputs.reciptno,
            qty: Inputs.qty,
            c_by:name.userId,
            loc_id:name.loc_id

        }
        console.log(body);

        try {
            await postEntry(body);
            setInputs({
                inwardDate: "",
                posttype: "",
                city: "",
                name:"",
                remark: "",
                reciptno: "",
                qty: "",

            })
            dispatch(handlePartyNames({ id: 0, name: "",city:"",party_city:0 }));
            dispatch(handleSelectDept({ id: 0, name: "" }));
            dispatch(handleSelectFirm({ id: 0, name: "" }));
            dispatch(handleSelectPostType({ id: 0, name: "" }));

        } catch (error) {
            console.log(error);
        }
        navigate("/inwardentryview");
        
    }
    return (
        <>
            <div className="flex justify-center p-4">
                <div className="w-full max-w-4xl rounded-xl shadow-xl p-8">
                <h1><span className="flex justify-center font-semibold text-xl mb-4">Inward Entry</span></h1>
                    <form onSubmit={handleSubmit} className="form-control space-y-5">

                        <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3">
                            <div className="flex flex-col sm:flex-row sm:space-x-3 sm:w-1/2">
                                <label className="sm:w-[47%] bold" htmlFor="period">Inward Date<span className="text-error">*</span></label>
                                <input value={Inputs.inwardDate} onChange={handleInput} name="inwardDate" type="date" placeholder="Type here" className="input input-bordered h-9 w-full sm:w-2/3" />
                            </div>
                            <div className="flex flex-col sm:flex-row sm:space-x-3 sm:w-1/2">
                                <label className="sm:w-1/5 semi-bold" htmlFor="interestRate">DOC No<span className="text-error">*</span></label>
                                <input readOnly name="interestrate" type="number" className="input input-bordered h-10 w-full sm:w-[61%]" />
                            </div> 
                        </div>
                        <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3 mb-5">
                            <label className="sm:w-1/4 semi-bold" htmlFor="interestAC">Post Type<span className="text-error">*</span></label>
                            <div className="join w-full">
                                <input defaultValue={post_name} readOnly name="interestac" type="text" className="input input-bordered h-9 w-full sm:w-4/5 join-item" />
                                <button type="button" onClick={() => (document.getElementById("postModal") as HTMLDialogElement).showModal()} className="btn btn-sm h-9 join-item btn-info btn-outline">Select</button>
                            </div>
                        </div>



                        <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3 mb-5">
                            <label className="sm:w-1/4 semi-bold" htmlFor="interestAC">Firm Name<span className="text-error">*</span></label>
                            <div className="join w-full">
                                <input defaultValue={firm_name} readOnly name="interestac" type="text" className="input input-bordered h-9 w-full sm:w-4/5 join-item" />
                                <button type="button" onClick={() => (document.getElementById("firmModal") as HTMLDialogElement).showModal()} className="btn btn-sm h-9 join-item btn-info btn-outline">Select</button>
                            </div>
                        </div>

                        <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3 mb-5">
                            <label className="sm:w-1/4 semi-bold" htmlFor="interestAC">Department<span className="text-error">*</span></label>
                            <div className="join w-full">
                                <input defaultValue={dept_name} readOnly name="interestac" type="text" className="input input-bordered h-9 w-full sm:w-4/5 join-item" />
                                <button type="button" onClick={() => (document.getElementById("deptModal") as HTMLDialogElement).showModal()} className="btn btn-sm h-9 join-item btn-info btn-outline">Select</button>
                            </div>
                        </div>

                        {/* <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3 mb-5">
                            <label className="sm:w-1/4 semi-bold" htmlFor="interestAC"> Name<span className="text-error">*</span></label>
                            <div className="join w-full">
                                <input  name="interestac" type="text" className="input input-bordered h-9 w-full sm:w-[71%]" />
                                
                            </div>
                        </div> */}
                         <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3 mb-5">
                            <label className="sm:w-1/5 semi-bold" htmlFor="remark">Name<span className="text-error">*</span></label>
                            <input  onChange={handleInput} name="name" type="text" className="input input-bordered h-9 w-full sm:w-[71%]" />
                        </div>

                        <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3 mb-5">
                            <label className="sm:w-1/5 semi-bold" htmlFor="remark">City</label>
                            <input  onChange={handleInput} name="city" type="text" className="input input-bordered h-9 w-full sm:w-[71%]" />
                        </div>

                        <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3 mb-5">
                            <label className="sm:w-1/5 semi-bold" htmlFor="remark">Remark</label>
                            <input value={Inputs.remark} onChange={handleInput} name="remark" type="text" className="input input-bordered h-9 w-full sm:w-[71%]" />
                        </div>

                        <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3 mb-5">
                            <div className="flex flex-col sm:flex-row sm:space-x-3 sm:w-1/2">
                                <label className="sm:w-[47%] semi-bold" htmlFor="reciptNo">Recipt No</label>
                                <input value={Inputs.reciptno} onChange={handleInput} name="reciptno" type="text" placeholder="Type here" className="input input-bordered h-9 w-full sm:w-2/3" />
                            </div>
                            <div className="flex flex-col sm:flex-row sm:space-x-3 sm:w-1/2">
                                <label className="sm:w-1/5 semi-bold" htmlFor="qty">QTY</label>
                                <input value={Inputs.qty} onChange={handleInput} name="qty" type="number" className="input input-bordered h-9 w-full sm:w-[61%]" />
                            </div>
                        </div>

                        <div className="flex justify-center space-x-3">
                            <button type="submit" className="btn btn-sm btn-outline btn-success">Submit</button>
                            <Link to="/inwardentryview" type="button" className="btn btn-sm btn-outline">Cancel</Link>
                        </div>

                    </form>
                </div>
            </div>

            <DeptModal />
            <FirmModal />
            {/* <NameModal /> */}
            <PostTypeModal />
        </>

    )
}

export default InwardEntry;
