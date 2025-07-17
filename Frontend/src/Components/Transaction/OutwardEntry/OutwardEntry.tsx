import { Link, useNavigate } from "react-router-dom";
import { FormEvent,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import DeptModal from "../InwardEntry/DeptModal";
import FirmModal from "../InwardEntry/FirmModal";
import NameModal from "../InwardEntry/NameModal";
import PostTypeModal from "../InwardEntry/PostTypeModal";
import {postOutEntry } from "../../../Services/Transaction/TransactionsAPI";
import { handlePartyNames, handleSelectDept, handleSelectFirm, handleSelectPostType } from "../../../Features/PostEntry/PostEntrySlice";
import { toast } from "sonner";
const currentdate = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format
const OutwardEntry = () => {
    const [Inputs, setInputs] = useState({
        outwardDate: currentdate    
        ,
        posttype: "",
        name:"",
        city: "",
        remark: "",
        reciptno: "",
        qty: "",
        frmachine:"",
        charges:""

    });
    const dispatch: AppDispatch = useDispatch();
    const {user} = useSelector((state:RootState)=>state.auth);
    const name = JSON.parse(user);
    const { dept_id, dept_name, firm_id, firm_name, post_id, post_name, } = useSelector((state: RootState) => state.postentry)
    const handleInput = (e: any) => {
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value });

    }

 const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if ( !Inputs.outwardDate || !Inputs.remark || !firm_id|| !dept_id ) {                     
            toast.error("All fields are required. Please fill them out.");
          return; 
          
      }
        let body = {
            flag: "O",
            status:"A",
            entry_date: Inputs.outwardDate,
            post_type: post_id,
            dept_id: dept_id,
            firm_id: firm_id,
            party_name:Inputs.name,
            city_name: Inputs.city,
            remark: Inputs.remark,
            receipt_no: Inputs.reciptno,
            qty: Inputs.qty,
            charges:Inputs.charges,
            fr_machine:Inputs.frmachine,
            c_by:name.userId,
            loc_id:name.loc_id

        }
        console.log(body);

        try {
            await postOutEntry(body);
    
            dispatch(handlePartyNames({ id: 0, name: "", city: "",party_city:0 }));
            dispatch(handleSelectDept({ id: 0, name: "" }));
            dispatch(handleSelectFirm({ id: 0, name: "" }));
            dispatch(handleSelectPostType({ id: 0, name: "" }));
            setInputs({
                outwardDate: "",
                posttype: "",
                name:"",
                city: "",
                remark: "",
                reciptno: "",
                qty: "",
                frmachine:"",
                charges:""
            });

        } catch (error) {
            console.log(error);
        }
      navigate("/outwardentryview")
    }

    return (
        <>
            <div className="flex justify-center p-4">
                <div className="w-full max-w-4xl rounded-xl shadow-xl p-8">
                    <h1><span className="flex justify-center font-semibold text-xl mb-4">Outward Entry</span></h1>
                    <form onSubmit={handleSubmit} className="form-control space-y-5">

                        <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3">
                            <div className="flex flex-col sm:flex-row sm:space-x-3 sm:w-1/2">
                                <label className="sm:w-[47%] bold" htmlFor="period">Outward Date<span className="text-error">*</span></label>
                                <input value={Inputs.outwardDate} onChange={handleInput} name="outwardDate" type="date" placeholder="Type here" className="input input-bordered h-8 w-full sm:w-2/3" />
                            </div>
                            <div className="flex flex-col sm:flex-row sm:space-x-3 sm:w-1/2">
                                <label className="sm:w-1/5 semi-bold" htmlFor="interestRate">DOC No<span className="text-error">*</span></label>
                                <input readOnly name="interestrate" type="number" className="input input-bordered h-8 w-full sm:w-[61%]" />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3 mb-5">
                            <label className="sm:w-1/4 semi-bold flex" htmlFor="interestAC">Post Type<span className="text-error">*</span></label>
                            <div className="join w-full">
                                <input readOnly defaultValue={post_name} name="interestac" type="text" className="input input-bordered h-8 w-full sm:w-4/5 join-item" />
                                <button  type="button" onClick={() => (document.getElementById("postModal") as HTMLDialogElement).showModal()} className="btn btn-sm h-8 join-item btn-info btn-outline">Select</button>
                            </div>
                        </div>


                        <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3 mb-5">
                            <label className="sm:w-1/4 semi-bold" htmlFor="interestAC">Firm Name<span className="text-error">*</span></label>
                            <div className="join w-full">
                                <input readOnly defaultValue={firm_name} name="interestac" type="text" className="input input-bordered h-8 w-full sm:w-4/5 join-item" />
                                <button type="button" onClick={() => (document.getElementById("firmModal") as HTMLDialogElement).showModal()} className="btn btn-sm h-8 join-item btn-info btn-outline">Select</button>
                            </div>
                        </div>

                        <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3 mb-5">
                            <label className="sm:w-1/4 semi-bold" htmlFor="interestAC">Department<span className="text-error">*</span></label>
                            <div className="join w-full">
                                <input readOnly defaultValue={dept_name} name="interestac" type="text" className="input input-bordered h-8 w-full sm:w-4/5 join-item" />
                                <button type="button" onClick={() => (document.getElementById("deptModal") as HTMLDialogElement).showModal()} className="btn btn-sm h-8 join-item btn-info btn-outline">Select</button>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3 mb-5">
                            <label className="sm:w-1/5 semi-bold" htmlFor="remark">Name<span className="text-error">*</span></label>
                            <input value={Inputs.name} onChange={handleInput} name="name" type="text" className="input input-bordered h-9 w-full sm:w-[71%]" />
                        </div>

                        <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3 mb-5">
                            <label className="sm:w-1/5 semi-bold" htmlFor="remark">City<span className="text-error">*</span></label>
                            <input value={Inputs.city} onChange={handleInput} name="city" type="text" className="input input-bordered h-9 w-full sm:w-[71%]" />
                        </div>

                        <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3 mb-5">
                            <label className="sm:w-1/5 semi-bold" htmlFor="remark">Remark<span className="text-error">*</span></label>
                            <input value={Inputs.remark} onChange={handleInput} name="remark" type="text" className="input input-bordered h-8 w-full sm:w-[71%]" />
                        </div>

                        <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3 mb-5">
                            <div className="flex flex-col sm:flex-row sm:space-x-3 sm:w-1/2">
                                <label className="sm:w-[47%] semi-bold" htmlFor="reciptNo">Recipt No<span className="text-error">*</span></label>
                                <input value={Inputs.reciptno} onChange={handleInput} name="reciptno" type="text" placeholder="Type here" className="input input-bordered h-8 w-full sm:w-2/3" />
                            </div>
                            <div className="flex flex-col sm:flex-row sm:space-x-3 sm:w-1/2">
                                <label className="sm:w-1/5 semi-bold" htmlFor="qty">QTY<span className="text-error">*</span></label>
                                <input value={Inputs.qty} onChange={handleInput} name="qty" type="number" className="input input-bordered h-8 w-full sm:w-[61%]" />
                            </div>
                        </div>

                        <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3 ">
                            <div className="flex flex-col sm:flex-row sm:space-x-3 sm:w-1/2">
                                <label className="sm:w-[47%] semi-bold" htmlFor="reciptNo">Fr.Machine<span className="text-error">*</span></label>
                                <select value={Inputs.frmachine} onChange={handleInput} className="input input-bordered h-8 w-full sm:w-2/3" name="frmachine">
                                    <option value="">Select..</option>
                                    <option value="Y">Yes</option>
                                    <option value="N">No</option>

                                </select>

                            </div>
                            <div className="flex flex-col sm:flex-row sm:space-x-3 sm:w-1/2">
                                <label className="sm:w-1/5 semi-bold" htmlFor="qty">Charges<span className="text-error">*</span></label>
                                <input value={Inputs.charges} onChange={handleInput} name="charges" type="number" className="input input-bordered h-8 w-full sm:w-[61%]" />
                            </div>
                        </div>

                        <h2><span className="flex justify-center text-sm font-semibold">Return/Received</span></h2>
                        <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3 ">
                            <div className="flex flex-col sm:flex-row sm:space-x-3 sm:w-1/2">
                                <label className="sm:w-[47%] semi-bold" htmlFor="reciptNo">Status<span className="text-error">*</span></label>
                                <select className="input input-bordered h-8 w-full sm:w-2/3" name="frmachine">
                                    <option value=""></option>
                                    <option value="Y">Yes</option>
                                    <option value="N">No</option>

                                </select>

                            </div>
                            <div className="flex flex-col sm:flex-row sm:space-x-3 sm:w-1/2">
                                <label className="sm:w-1/5 semi-bold" htmlFor="qty">Date<span className="text-error">*</span></label>
                                <input readOnly name="qty" type="date" className="input input-bordered h-8 w-full sm:w-[61%]" />
                            </div>
                        </div>

                        <div className="flex justify-center space-x-3">
                            <button type="submit" className="btn btn-sm btn-outline btn-success">Submit</button>
                            <Link to="/outwardentryview" type="button" className="btn btn-sm btn-outline">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>

            <DeptModal />
            <FirmModal />
            <NameModal />
            <PostTypeModal />
        </>
    )
}

export default OutwardEntry;
