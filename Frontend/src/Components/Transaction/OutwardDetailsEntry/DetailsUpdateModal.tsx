import { FC, FormEvent, useState } from "react";
import { toast } from "sonner";
import { updateOutwardDetails } from "../../../Services/Transaction/TransactionsAPI";
interface Outward {
    row: any;
}
const DetailsUpdateModal: FC<Outward> = ({ row }) => {
    console.log(row.entry_id);

    const [Inputs, setInputs] = useState({
        amount: "",
        return: '',
        recno: "",
        recdate: "",

    });


    const handleInputs = (e: any) => {
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value })

    }
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Validation: Check if at least one required field is filled
        if (!Inputs.amount && !Inputs.return && !Inputs.recno && !Inputs.recdate) {
            toast.error(" field must be filled.");
            return;
        }

        let body = {
            entry_id: row.entry_id || "0",
            charges: Inputs.amount || "",
            ret: Inputs.return || "",
            rec_no: Inputs.recno || "",
            rec_date: Inputs.recdate || "",
        };

        console.log(body);

        try {
            await updateOutwardDetails(body);
            setInputs({
                amount: "",
                return: '',
                recno: "",
                recdate: "",
            });
            toast.success("Details updated successfully.");
        } catch (error: any) {
            toast.error(error.message || "An error occurred.");
        }

        (document.getElementById("detailsModal") as HTMLDialogElement).close();
    };

    return (
        <dialog id="detailsModal" className="modal">

            <div className="modal-box  w-11/12 max-w-4xl">
                <button
                    onClick={() => (document.getElementById("detailsModal") as HTMLDialogElement)?.close()}
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >
                    ✕
                </button>
                <form onSubmit={handleSubmit} className="form-control space-y-5">
                    <h1 className="flex justify-center font-bold mb-3 text-lg"><span>Outward Details Update....</span></h1>

                    <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3">
                        <div className="flex flex-col sm:flex-row sm:space-x-3 sm:w-1/2">
                            <label className="sm:w-[47%] bold" htmlFor="period">Amount<span className="text-error">*</span></label>
                            <input value={Inputs.amount} onChange={handleInputs} name="amount" type="number" placeholder="Type here" className="input input-bordered h-9 w-full sm:w-2/3" />
                        </div>
                        <div className="flex flex-col sm:flex-row sm:space-x-3 sm:w-1/2">
                            <label className="sm:w-1/5 semi-bold" htmlFor="interestRate">Return<span className="text-error">*</span></label>
                            <input value={Inputs.return} onChange={handleInputs} name="return" type="text" className="input input-bordered h-10 w-full sm:w-[61%]" />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3">
                        <div className="flex flex-col sm:flex-row sm:space-x-3 sm:w-1/2">
                            <label className="sm:w-[47%] bold" htmlFor="period">Rec.No<span className="text-error">*</span></label>
                            <input value={Inputs.recno} onChange={handleInputs} name="recno" type="text" placeholder="Type here" className="input input-bordered h-9 w-full sm:w-2/3" />
                        </div>
                        <div className="flex flex-col sm:flex-row sm:space-x-3 sm:w-1/2">
                            <label className="sm:w-1/5 semi-bold" htmlFor="interestRate">Rec.Date<span className="text-error">*</span></label>
                            <input value={Inputs.recdate} onChange={handleInputs} name="recdate" type="date" className="input input-bordered h-10 w-full sm:w-[61%]" />
                        </div>
                    </div>


                    <div className="flex justify-center gap-5">
                        <button className="btn btn-sm btn-outline btn-success" type="submit">Update</button>
                        <button
                            type="button"
                            onClick={() => (document.getElementById("detailsModal") as HTMLDialogElement)?.close()}
                            className="btn float-end btn-sm btn-outline"   >
                            Close
                        </button>

                    </div>
                </form>


            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}

export default DetailsUpdateModal;
