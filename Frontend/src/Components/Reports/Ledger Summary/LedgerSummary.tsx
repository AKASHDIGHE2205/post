
const LedgerSummary = () => {
  return (
    <div className="flex justify-center p-4">

      <div className="w-full max-w-4xl rounded-xl shadow-xl p-8">
        <h1><span className="flex justify-center font-semibold text-lg mb-4">Ledger Summary...</span></h1>
        <form className="form-control space-y-5">
          <div className="flex flex-col sm:flex-row sm:space-x-3">
            <div className="flex flex-col sm:flex-row sm:w-1/2 sm:items-center mb-2">
              <label className="sm:w-[30%] mb-1 bold" htmlFor="period">Ledger From<span className="text-error">*</span></label>
              <input name="inwardDate" type="date" placeholder="Type here" className="input input-bordered h-9 w-full sm:w-[70%]" />
            </div>
            <div className="flex flex-col sm:flex-row sm:w-1/2 sm:items-center">
              <label className="sm:w-[25%] mb-2 semi-bold" htmlFor="interestRate">To Date<span className="text-error">*</span></label>
              <input name="toDate" type="date" placeholder="Type here" className="input input-bordered h-9 w-full sm:w-[70%]" />
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <button className="btn btn-sm h-10 btn-success btn-outline">Submit</button>
            <button className="btn btn-sm btn-outline btn-neutral h-10 ">Cancel</button>
          </div>

        </form>
      </div>

    </div>
  )
}

export default LedgerSummary
