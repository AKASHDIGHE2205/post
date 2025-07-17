import FirmModal from "../InwardEntry/FirmModal";
import { useState, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { handleSelectFirm } from "../../../Features/PostEntry/PostEntrySlice";
import { editVoucherEntry} from "../../../Services/Transaction/TransactionsAPI";
import { RootState } from "../../../store/store";
import {formatDate} from "../../Helper/Helper"
const EditVoucherModal = ({items}:any) => {
    const [Inputs, setInputs] = useState({
        voucherDate: "",
        receiptNo: "",
        paidDate: "",
        stamp: "",
        frMachine: "",
        remark: "",


    });
    const { firm_id, firm_name } = useSelector((state: RootState) => state.postentry);
    const dispatch = useDispatch();
   
     useEffect(()=>{
          setInputs({
            voucherDate: formatDate(items.v_date),
            receiptNo: items.receipt_no,
            paidDate: formatDate(items.paid_date),
            stamp:items.stamp,
            frMachine: items.fr_machine,
            remark: items.remark,
          });
          dispatch(handleSelectFirm({id:items.firm_id,name:items.firm_name}));
     },[items,dispatch])


    const handelSubmit = async (e: FormEvent) => {
        e.preventDefault();
          
        let body = {
            v_no:items.v_no,
            v_date: Inputs.voucherDate,
            receipt_no: Inputs.receiptNo,
            paid_date: Inputs.paidDate,
            firm_name: firm_id,
            stamp: Inputs.stamp,
            fr_machine: Inputs.frMachine,
            remark: Inputs.remark,
        }
        console.log(body);
        setInputs({
            voucherDate: "",
            receiptNo: "",
            paidDate: "",
            stamp: "",
            frMachine: "",
            remark: "",

        })
        dispatch(handleSelectFirm({ id: 0, name: "" }));
        try {
            await editVoucherEntry(body);
        } catch (error: any) {
            toast.error(error);
        }
        
        window.location.href = "voucherentryview"

    }
    
    const handleInputs = (e: any) => {
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value })
        
    }
    const handleCancel = ()=>{
        (document.getElementById('editVoucher')as HTMLDialogElement).close();
        dispatch(handleSelectFirm({ id: 0, name: "" }));
    }
    return (
        <>

            <dialog id="editVoucher" className="modal">
                <div className="modal-box max-w-5xl">
                <div className="flex justify-center p-4">
                <div className="w-full max-w-4xl rounded-xl  p-8">
                    <form onSubmit={handelSubmit} className="form-control space-y-5">
                        <h1 className="flex text-lg font-semibold mb-3 justify-center">
                            <span>Voucher Entry</span>
                        </h1>
                        <div className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-1/3 mb-2 sm:mb-0 font-semibold" htmlFor="voucherNo">
                                        Voucher No <span className="text-error">*</span>
                                    </label>
                                    <input readOnly name="voucherNo" type="number" className="input input-bordered h-9 w-full sm:w-2/3" />
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-1/3 mb-2 sm:mb-0 font-semibold" htmlFor="voucherDate">
                                        Voucher Date <span className="text-error">*</span>
                                    </label>
                                    <input value={Inputs.voucherDate} onChange={handleInputs} name="voucherDate" type="date" className="input input-bordered h-9 w-full sm:w-2/3" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-1/3 mb-2 sm:mb-0 font-semibold" htmlFor="receiptNo">
                                        Receipt No <span className="text-error">*</span>
                                    </label>
                                    <input value={Inputs.receiptNo} onChange={handleInputs} name="receiptNo" type="text" className="input input-bordered h-9 w-full sm:w-2/3" />
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-1/3 mb-2 sm:mb-0 font-semibold" htmlFor="paidDate">
                                        Paid Date <span className="text-error">*</span>
                                    </label>
                                    <input value={Inputs.paidDate} onChange={handleInputs} name="paidDate" type="date" className="input input-bordered h-9 w-full sm:w-2/3" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-[10rem] mb-2 sm:mb-0 font-semibold" htmlFor="firmName">
                                        Firm Name <span className="text-error">*</span>
                                    </label>
                                    <div className="join w-full">
                                        <input value={firm_name} readOnly  name="interestac" type="text" className="input input-bordered h-9 w-full sm:w-5/6 join-item" />
                                        <button type="button" onClick={() => (document.getElementById("firmModal") as HTMLDialogElement).showModal()} className="btn btn-sm h-9 join-item btn-info btn-outline">Select</button>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-1/3 mb-2 sm:mb-0 font-semibold" htmlFor="stamp">
                                        Stamp <span className="text-error">*</span>
                                    </label>
                                    <input value={Inputs.stamp} onChange={handleInputs} name="stamp" type="number" className="input input-bordered h-9 w-full sm:w-2/3" />
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-1/3 mb-2 sm:mb-0 font-semibold" htmlFor="frMachine">
                                        Fr. Machine <span className="text-error">*</span>
                                    </label>
                                    <input value={Inputs.frMachine} onChange={handleInputs} name="frMachine" type="text" className="input input-bordered h-9 w-full sm:w-2/3" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <label className="sm:w-[135px] mb-2 sm:mb-0 font-semibold" htmlFor="remark">
                                        Remark <span className="text-error">*</span>
                                    </label>
                                    <input value={Inputs.remark} onChange={handleInputs} name="remark" type="text" className="input input-bordered h-9 w-full sm:w-5/6" />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center space-x-3">
                            <button type="submit" className="btn btn-sm btn-outline btn-success">
                                Submit
                            </button>
                            <button type="button" onClick={handleCancel} className="btn btn-sm btn-outline">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <FirmModal />
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={handleCancel}>close</button>
                </form>
            </dialog>
        </>
    )
}

export default EditVoucherModal;
