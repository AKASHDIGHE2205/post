
import { Link } from "react-router-dom";

const StampEntry = () => {
  
    return (
        <div className="flex justify-center p-4">
            <div className="w-full max-w-4xl rounded-xl shadow-xl p-8">
                <form className="form-control space-y-5">
                    <h1 className="flex text-lg font-semibold mb-3 justify-center"><span>Stamp Entry</span></h1>

                    <div className="flex flex-col space-y-5">
                        <div className="flex flex-col sm:flex-row sm:space-x-3">
                            <div className="flex flex-col sm:flex-row sm:w-1/2 sm:items-center mb-2">
                                <label className="sm:w-[30%] mb-1 bold" htmlFor="period">Pur Date<span className="text-error">*</span></label>
                                <input name="inwardDate" type="date" placeholder="Type here" className="input input-bordered h-9 w-full sm:w-[70%]" />
                            </div>
                            <div className="flex flex-col sm:flex-row sm:w-1/2 sm:items-center">
                                <label className="sm:w-[25%] mb-2 semi-bold" htmlFor="interestRate">DOC No<span className="text-error">*</span></label>
                                <input readOnly name="interestrate" type="number" className="input input-bordered h-9 w-full sm:w-[75%]" />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center">
                            <label className="sm:w-[15%] semi-bold mb-1" htmlFor="name">Firm Name<span className="text-error">*</span></label>
                            <input name="firmname" type="text" className="input input-bordered h-9 w-full sm:w-[85%]" />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:space-x-3">
                            <div className="flex flex-col sm:flex-row sm:w-1/2 sm:items-center mb-2">
                                <label className="sm:w-[30%] semi-bold mb-1" htmlFor="reciptNo">Stamp<span className="text-error">*</span></label>
                                <input name="reciptNo" type="text" className="input input-bordered h-9 w-full sm:w-[70%]" />
                            </div>
                            <div className="flex flex-col sm:flex-row sm:w-1/2 sm:items-center">
                                <label className="sm:w-[25%] mb-1 semi-bold" htmlFor="qty">Fr.machine<span className="text-error">*</span></label>
                                <input name="qty" type="text" className="input input-bordered h-9 w-full sm:w-[75%]" />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:space-x-3">
                            <div className="flex flex-col sm:flex-row sm:w-1/2 sm:items-center mb-2">
                                <label className="sm:w-[30%] mb-1 semi-bold" htmlFor="reciptNo">Recipt No<span className="text-error">*</span></label>
                                <input name="reciptNo" type="number" className="input input-bordered h-9 w-full sm:w-[70%]" />
                            </div>
                            <div className="flex flex-col sm:flex-row sm:w-1/2 sm:items-center">
                                <label className="sm:w-[25%] mb-1 semi-bold" htmlFor="qty">Pay Date<span className="text-error">*</span></label>
                                <input name="qty" type="date" className="input input-bordered h-9 w-full sm:w-[75%]" />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center">
                            <label className="sm:w-[15%] semi-bold" htmlFor="remark">Remark<span className="text-error">*</span></label>
                            <input name="remark" type="text" className="input input-bordered h-9 w-full sm:w-[85%]" />
                        </div>
                    </div>

                    <div className="flex justify-center space-x-3">
                        <button type="submit" className="btn btn-sm btn-outline btn-success">Submit</button>
                        <Link to="/society/schemeview" type="button" className="btn btn-sm btn-outline">Cancel</Link>
                    </div>
                </form>
            </div>
        </div>





    )
}

export default StampEntry;
