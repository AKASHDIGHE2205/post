import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../../store/store";
import FirmModal from "../InwardEntry/FirmModal";
import { toast } from "sonner";
import { handleSelectFirm } from "../../../Features/PostEntry/PostEntrySlice";
import { postVoucherEntry } from "../../../Services/Transaction/TransactionsAPI";

const VoucherEntry = () => {
    const [Inputs, setInputs] = useState({
        voucherDate: "",
        receiptNo: "",
        paidDate: "",
        stamp: "",
        frMachine: "",
        remark: "",


    });
    const navigate = useNavigate();
    const { firm_id, firm_name } = useSelector((state: RootState) => state.postentry);
    
    
    const dispatch = useDispatch();
    const handelSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!Inputs.voucherDate ||
            !Inputs.receiptNo ||
            !Inputs.paidDate ||
            !firm_id ||
            !Inputs.stamp ||
            !Inputs.frMachine ||
            !Inputs.remark) {
            toast.error("All fields are required. Please fill them out.");
            return;
        }
        let body = {
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
            await postVoucherEntry(body);
        } catch (error: any) {
            toast.error(error);
        }


      navigate("/voucherentryview")

    }

    const handleInputs = (e: any) => {
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value })

    }
    return (
        <>
            <div className="flex justify-center p-4">
                <div className="w-full max-w-4xl rounded-xl shadow-xl p-8">
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
                            <Link to="/voucherentryview" className="btn btn-sm btn-outline">
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            <FirmModal />


        </>
    )
}

export default VoucherEntry;
