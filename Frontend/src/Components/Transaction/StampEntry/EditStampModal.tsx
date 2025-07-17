
import { useState, FormEvent, FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleSelectFirm } from "../../../Features/PostEntry/PostEntrySlice";
import { editStampEntry} from "../../../Services/Transaction/TransactionsAPI";
import { AppDispatch, RootState } from "../../../store/store";
import { formatDate } from "../../Helper/Helper"
import FirmModal from "../InwardEntry/FirmModal";

interface Edit {
    items: any;
}
const EditStampModal: FC<Edit> = ({ items }) => {
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
    

    useEffect(() => {
        setInputs({
            purdate: formatDate(items.pur_date),
            stamp: items.stamp,
            frmachine: items.fr_machine,
            receiptNo: items.rec_no,
            paydate: items.pay_date,
            remark: items.remark,
        });
        dispatch(handleSelectFirm({ id: items.firm_id, name: items.firm_name }));

    }, [items, dispatch]);
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        let body = {
            stamp_id: items.stamp_id,
            pur_date: Inputs.purdate,
            firm_name: firm_id,
            stamp: Inputs.stamp,
            fr_machine: Inputs.frmachine,
            rec_no: Inputs.receiptNo,
            pay_date: Inputs.paydate,
            remark: Inputs.remark,
            
        }

        try {
            await editStampEntry(body);
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
        
        window.location.href = "/stampentryview";
        (document.getElementById("editstampModal") as HTMLDialogElement).close();
        
    }
    const handleInputs = (e: any) => {
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value });


    }
 
    const handleCancel = ()=>{
        dispatch(handleSelectFirm({ id: 0, name: "" }));
        (document.getElementById("editstampModal") as HTMLDialogElement)?.close();
    }
    return (
        <>


            <dialog id="editstampModal" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <button
                        onClick={handleCancel}
                        className="btn btn-sm btn-circle btn-ghost float-end sticky top-0"
                    >
                        ✕
                    </button>
                    <div className="flex justify-center p-4">
                        <div className="w-full max-w-4xl rounded-xl p-8">
                            <form onSubmit={handleSubmit} className="form-control space-y-5">
                                <h1 className="text-lg font-semibold mb-3 text-center">Stamp Entry</h1>

                                <div className="flex flex-col space-y-5">
                                    <div className="flex flex-col space-y-5 sm:space-y-0 sm:flex-row sm:space-x-3">
                                        <div className="flex flex-col sm:flex-row sm:w-1/2 sm:items-center mb-2">
                                            <label className="w-full sm:w-[30%] mb-1 sm:mb-0 font-semibold" htmlFor="purdate">Pur Date<span className="text-error">*</span></label>
                                            <input value={Inputs.purdate} onChange={handleInputs} name="purdate" type="date" placeholder="Type here" className="input input-bordered h-9 w-full sm:w-[70%]" />
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:w-1/2 sm:items-center">
                                            <label className="w-full sm:w-[25%] mb-2 sm:mb-0 font-semibold" htmlFor="docno">DOC No<span className="text-error">*</span></label>
                                            <input readOnly name="docno" type="number" className="input input-bordered h-9 w-full sm:w-[75%]" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col space-y-5 sm:space-y-0 sm:flex-row sm:space-x-3 mb-5">
                                        <div className="flex flex-col sm:flex-row sm:w-full sm:items-center">
                                            <label className="w-full sm:w-[15%] font-semibold" htmlFor="firmname">Firm Name<span className="text-error">*</span></label>
                                            <div className="join w-full sm:w-[85%]">
                                                <input readOnly value={firm_name} name="firmname" type="text" className="input input-bordered h-9 w-full join-item" />
                                                <button type="button" onClick={() => (document.getElementById("firmModal") as HTMLDialogElement).showModal()} className="btn btn-sm h-9 join-item btn-info btn-outline">Select</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col space-y-5 sm:space-y-0 sm:flex-row sm:space-x-3">
                                        <div className="flex flex-col sm:flex-row sm:w-1/2 sm:items-center mb-2">
                                            <label className="w-full sm:w-[30%] mb-1 sm:mb-0 font-semibold" htmlFor="stamp">Stamp<span className="text-error">*</span></label>
                                            <input value={Inputs.stamp} onChange={handleInputs} name="stamp" type="number" className="input input-bordered h-9 w-full sm:w-[70%]" />
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:w-1/2 sm:items-center">
                                            <label className="w-full sm:w-[25%] mb-1 sm:mb-0 font-semibold" htmlFor="frmachine">Fr.machine<span className="text-error">*</span></label>
                                            <input value={Inputs.frmachine} onChange={handleInputs} name="frmachine" type="number" className="input input-bordered h-9 w-full sm:w-[75%]" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col space-y-5 sm:space-y-0 sm:flex-row sm:space-x-3">
                                        <div className="flex flex-col sm:flex-row sm:w-1/2 sm:items-center mb-2">
                                            <label className="w-full sm:w-[30%] mb-1 sm:mb-0 font-semibold" htmlFor="reciptno">Recipt No<span className="text-error">*</span></label>
                                            <input value={Inputs.receiptNo} onChange={handleInputs} name="receiptNo" type="text" className="input input-bordered h-9 w-full sm:w-[70%]" />
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:w-1/2 sm:items-center">
                                            <label className="w-full sm:w-[25%] mb-1 sm:mb-0 font-semibold" htmlFor="paydate">Pay Date<span className="text-error">*</span></label>
                                            <input value={Inputs.paydate} onChange={handleInputs} name="paydate" type="date" className="input input-bordered h-9 w-full sm:w-[75%]" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-center">
                                        <label className="w-full sm:w-[15%] font-semibold" htmlFor="remark">Remark<span className="text-error">*</span></label>
                                        <input value={Inputs.remark} onChange={handleInputs} name="remark" type="text" className="input input-bordered h-9 w-full sm:w-[85%]" />
                                    </div>
                                </div>

                                <div className="flex justify-center space-x-3">
                                    <button type="submit" className="btn btn-sm btn-outline btn-success">Submit</button>
                                    <button onClick={handleCancel} type="button" className="btn btn-sm btn-outline">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={handleCancel}>close</button>
                </form>
            </dialog>
            <FirmModal />
        </>
    )
}

export default EditStampModal;
