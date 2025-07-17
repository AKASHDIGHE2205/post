
import { Link, useNavigate } from "react-router-dom";
import FirmModal from "../InwardEntry/FirmModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { FormEvent, useState } from "react";
import { postStampEntry } from "../../../Services/Transaction/TransactionsAPI";
import { handleSelectFirm } from "../../../Features/PostEntry/PostEntrySlice";
import { toast } from "sonner";


const StampEntry = () => {
    const [Inputs, setInputs] = useState({
        purdate: "",
        stamp: "",
        frmachine: "",
        receiptNo: "",
        paydate: "",
        remark: "",



    });
    const { firm_name, firm_id } = useSelector((state: RootState) => state.postentry);
    const dispatch: AppDispatch = useDispatch();
   const naivgate = useNavigate();
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!Inputs.purdate)
           {
                toast.error("All fields are required. Please fill them out.");
            return;
                  
        }
        console.log(Inputs);
        let body = {
            pur_date: Inputs.purdate,
            firm_name: firm_id,
            stamp: Inputs.stamp,
            fr_machine: Inputs.frmachine,
            rec_no: Inputs.receiptNo,
            pay_date: Inputs.paydate,
            remark: Inputs.remark,


        }

        try {
            await postStampEntry(body);
            dispatch(handleSelectFirm({ id: 0, name: "" }));
            setInputs({
                purdate: "",
                stamp: "",
                frmachine: "",
                receiptNo: "",
                paydate: "",
                remark: "",

            })

        } catch (error) {
            console.log(error);

        }

        naivgate("/stampentryview");


    }
    const handleInputs = (e: any) => {
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value });


    }

    return (

        <>
            <div className="flex justify-center p-4">
                <div className="w-full max-w-4xl rounded-xl shadow-xl p-8">
                    <form onSubmit={handleSubmit} className="form-control space-y-5">
                        <h1 className="text-lg font-semibold mb-3 text-center">Stamp Entry</h1>

                        <div className="flex flex-col space-y-5">
                            <div className="flex flex-col space-y-5 sm:space-y-0 sm:flex-row sm:space-x-3">
                                <div className="flex flex-col sm:flex-row sm:w-1/2 sm:items-center mb-2">
                                    <label className="w-full sm:w-[30%] mb-1 sm:mb-0 font-semibold" htmlFor="purdate">Pur Date<span className="text-error">*</span></label>
                                    <input value={Inputs.purdate} onChange={handleInputs} name="purdate" type="date" placeholder="Type here" className="input input-bordered h-9 w-full sm:w-[70%]" />
                                </div>
                                <div className="flex flex-col sm:flex-row sm:w-1/2 sm:items-center">
                                    <label className="w-full sm:w-[25%] mb-2 sm:mb-0 font-semibold" htmlFor="docno">DOC No</label>
                                    <input readOnly name="docno" type="number" className="input input-bordered h-9 w-full sm:w-[75%]" />
                                </div>
                            </div>

                            <div className="flex flex-col space-y-5 sm:space-y-0 sm:flex-row sm:space-x-3 mb-5">
                                <div className="flex flex-col sm:flex-row sm:w-full sm:items-center">
                                    <label className="w-full sm:w-[15%] font-semibold" htmlFor="firmname">Firm Name</label>
                                    <div className="join w-full sm:w-[85%]">
                                        <input readOnly value={firm_name} name="firmname" type="text" className="input input-bordered h-9 w-full join-item" />
                                        <button type="button" onClick={() => (document.getElementById("firmModal") as HTMLDialogElement).showModal()} className="btn btn-sm h-9 join-item btn-info btn-outline">Select</button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col space-y-5 sm:space-y-0 sm:flex-row sm:space-x-3">
                                <div className="flex flex-col sm:flex-row sm:w-1/2 sm:items-center mb-2">
                                    <label className="w-full sm:w-[30%] mb-1 sm:mb-0 font-semibold" htmlFor="stamp">Stamp</label>
                                    <input value={Inputs.stamp} onChange={handleInputs} name="stamp" type="number" className="input input-bordered h-9 w-full sm:w-[70%]" />
                                </div>
                                <div className="flex flex-col sm:flex-row sm:w-1/2 sm:items-center">
                                    <label className="w-full sm:w-[25%] mb-1 sm:mb-0 font-semibold" htmlFor="frmachine">Fr.machine</label>
                                    <input value={Inputs.frmachine} onChange={handleInputs} name="frmachine" type="number" className="input input-bordered h-9 w-full sm:w-[75%]" />
                                </div>
                            </div>

                            <div className="flex flex-col space-y-5 sm:space-y-0 sm:flex-row sm:space-x-3">
                                <div className="flex flex-col sm:flex-row sm:w-1/2 sm:items-center mb-2">
                                    <label className="w-full sm:w-[30%] mb-1 sm:mb-0 font-semibold" htmlFor="reciptno">Recipt No</label>
                                    <input value={Inputs.receiptNo} onChange={handleInputs} name="receiptNo" type="text" className="input input-bordered h-9 w-full sm:w-[70%]" />
                                </div>
                                <div className="flex flex-col sm:flex-row sm:w-1/2 sm:items-center">
                                    <label className="w-full sm:w-[25%] mb-1 sm:mb-0 font-semibold" htmlFor="paydate">Pay Date</label>
                                    <input value={Inputs.paydate} onChange={handleInputs} name="paydate" type="date" className="input input-bordered h-9 w-full sm:w-[75%]" />
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center">
                                <label className="w-full sm:w-[15%] font-semibold" htmlFor="remark">Remark</label>
                                <input value={Inputs.remark} onChange={handleInputs} name="remark" type="text" className="input input-bordered h-9 w-full sm:w-[85%]" />
                            </div>
                        </div>

                        <div className="flex justify-center space-x-3">
                            <button type="submit" className="btn btn-sm btn-outline btn-success">Submit</button>
                            <Link to="/stampentryview" type="button" className="btn btn-sm btn-outline">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>


            <FirmModal />

        </>


    )
}

export default StampEntry;
