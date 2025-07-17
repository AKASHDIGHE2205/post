import { useState, FormEvent, FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { handleSelectDept, handleSelectFirm, handleSelectPostType } from "../../../Features/PostEntry/PostEntrySlice";
import { editOutwardEntry} from "../../../Services/Transaction/TransactionsAPI";
import { AppDispatch, RootState } from "../../../store/store";
import DeptModal from "../InwardEntry/DeptModal";
import FirmModal from "../InwardEntry/FirmModal";
import NameModal from "../InwardEntry/NameModal";
import PostTypeModal from "../InwardEntry/PostTypeModal";
import { formatDate } from "../../Helper/Helper";


interface Edit {
  items: any;
  fetchData:any
  
}

const EditOutModal: FC<Edit> = ({ items,fetchData }) => {
  const [recDate,setrecDate] = useState('');
  const [recStatus,setrecStatus] = useState('');
  const [Inputs, setInputs] = useState({
    outwardDate: "",
    name: "",
    city: "",
    remark: "",
    reciptno: "",
    qty: "",
    frmachine: "",
    charges: "",
    rec_status:"",
    rec_date:"",

  });

  const dispatch: AppDispatch = useDispatch();
  const {user} = useSelector((state:RootState)=>state.auth)
   const name = JSON.parse(user);
  const { dept_id, dept_name, firm_id, firm_name, post_id, post_name } = useSelector(
    (state: RootState) => state.postentry
  );
  useEffect(() => {
    const formattedDate = items.entry_date ? formatDate(items.entry_date) : "";
    setInputs({
      outwardDate: formattedDate,
      name: items.party_name || "",
      city: items.city_name || "",
      remark: items.remark || "",
      reciptno: items.reciptno || "",
      frmachine: items.fr_machine || "",
      charges: items.amount || "",
      qty: items.qty || "",
      rec_status:items.rec_status || "",
      rec_date:items.rec_date || "",
    });
    
      dispatch(handleSelectDept({ id: items.dept_id, name: items.dept_name }));
      dispatch(handleSelectFirm({ id: items.firm_id, name: items.firm_name }));
      dispatch(handleSelectPostType({ id: items.post_id, name: items.post_name }));
      

  }, [items,dispatch]);
  

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let body = {
      flag:"O",
      entry_id:items.entry_id,
      entry_date: Inputs.outwardDate,
      post_type: post_id,
      dept_id: dept_id,
      firm_id: firm_id,
      party_name: Inputs.name,
      city_name: Inputs.city,
      remark: Inputs.remark,
      receipt_no: Inputs.reciptno,
      qty: Inputs.qty,
      charges: Inputs.charges,
      fr_machine: Inputs.frmachine,
      loc_id:name.loc_id,
      rec_date:recDate,
      rec_status:recStatus
      
    };
    console.log(body);
    (document.getElementById("editOutModal") as HTMLDialogElement)?.close();
    fetchData();
    try {
      await editOutwardEntry(body);
      
      
      dispatch(handleSelectDept({ id: 0, name: "" }));
      dispatch(handleSelectFirm({ id: 0, name: "" }));
      dispatch(handleSelectPostType({ id: 0, name: "" }));
      setInputs({
        outwardDate: "",
        name: "",
        city: "",
        remark: "",
        reciptno: "",
        qty: "",
        frmachine: "",
        charges: "",
        rec_date:"",
        rec_status:""
      });
    } catch (error) {
      console.log(error);
    }
    
    
  };

  const handleCancel =()=>{
    dispatch(handleSelectDept({ id: 0, name: "" }));
    dispatch(handleSelectFirm({ id: 0, name: "" }));
    dispatch(handleSelectPostType({ id: 0, name: "" }));
    (document.getElementById('editOutModal') as HTMLDialogElement).close();
  }

  
  return (
    <>

    {/* Open the modal using document.getElementById('ID').showModal() method */}

<dialog id="editOutModal" className="modal">
<div className="modal-box w-11/12 max-w-4xl">
          <button
            onClick={handleCancel}
            className="btn btn-sm btn-circle btn-ghost float-end sticky top-0"
          >
            ✕
          </button>

          <div className="flex justify-center p-4">
            <div className="w-full max-w-4xl rounded-xl p-8">
              <h1>
                <span className="flex justify-center font-semibold text-xl mb-4">Outward Entry</span>
              </h1>
              <form onSubmit={handleSubmit} className="form-control space-y-5">
                <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3">
                  <div className="flex flex-col sm:flex-row sm:space-x-3 sm:w-1/2">
                    <label className="sm:w-[47%] bold" htmlFor="period">
                      Outward Date<span className="text-error">*</span>
                    </label>
                    <input
                      value={Inputs.outwardDate}
                      onChange={handleInput}
                      name="outwardDate"
                      type="date"
                      placeholder="Type here"
                      className="input input-bordered h-8 w-full sm:w-2/3"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:space-x-3 sm:w-1/2">
                    <label className="sm:w-1/5 semi-bold" htmlFor="interestRate">
                      DOC No<span className="text-error">*</span>
                    </label>
                    <input readOnly name="interestrate" type="number" className="input input-bordered h-8 w-full sm:w-[61%]" />
                  </div>
                </div>
                <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3 mb-5">
                  <label className="sm:w-1/4 semi-bold flex" htmlFor="interestAC">
                    Post Type<span className="text-error">*</span>
                  </label>
                  <div className="join w-full">
                    <input readOnly value={post_name} name="interestac" type="text" className="input input-bordered h-8 w-full sm:w-4/5 join-item" />
                    <button
                      type="button"
                      onClick={() => (document.getElementById("postModal") as HTMLDialogElement).showModal()}
                      className="btn btn-sm h-8 join-item btn-info btn-outline"
                    >
                      Select
                    </button>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3 mb-5">
                  <label className="sm:w-1/4 semi-bold" htmlFor="interestAC">
                    Firm Name<span className="text-error">*</span>
                  </label>
                  <div className="join w-full">
                    <input readOnly value={firm_name} name="interestac" type="text" className="input input-bordered h-8 w-full sm:w-4/5 join-item" />
                    <button
                      type="button"
                      onClick={() => (document.getElementById("firmModal") as HTMLDialogElement).showModal()}
                      className="btn btn-sm h-8 join-item btn-info btn-outline"
                    >
                      Select
                    </button>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3 mb-5">
                  <label className="sm:w-1/4 semi-bold" htmlFor="interestAC">
                    Department<span className="text-error">*</span>
                  </label>
                  <div className="join w-full">
                    <input readOnly value={dept_name} name="interestac" type="text" className="input input-bordered h-8 w-full sm:w-4/5 join-item" />
                    <button
                      type="button"
                      onClick={() => (document.getElementById("deptModal") as HTMLDialogElement).showModal()}
                      className="btn btn-sm h-8 join-item btn-info btn-outline"
                    >
                      Select
                    </button>
                  </div>
                </div>
                <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3 mb-5">
                  <label className="sm:w-1/5 semi-bold" htmlFor="remark">
                    Name<span className="text-error">*</span>
                  </label>
                  <input value={Inputs.name} onChange={handleInput} name="name" type="text" className="input input-bordered h-9 w-full sm:w-[71%]" />
                </div>

                <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3 mb-5">
                  <label className="sm:w-1/5 semi-bold" htmlFor="remark">
                    City<span className="text-error">*</span>
                  </label>
                  <input value={Inputs.city} onChange={handleInput} name="city" type="text" className="input input-bordered h-9 w-full sm:w-[71%]" />
                </div>

                <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3 mb-5">
                  <label className="sm:w-1/5 semi-bold" htmlFor="remark">
                    Remark<span className="text-error">*</span>
                  </label>
                  <input value={Inputs.remark} onChange={handleInput} name="remark" type="text" className="input input-bordered h-8 w-full sm:w-[71%]" />
                </div>

                <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3 mb-5">
                  <div className="flex flex-col sm:flex-row sm:space-x-3 sm:w-1/2">
                    <label className="sm:w-[47%] semi-bold" htmlFor="reciptNo">
                      Recipt No<span className="text-error">*</span>
                    </label>
                    <input
                      value={Inputs.reciptno}
                      onChange={handleInput}
                      name="reciptno"
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered h-8 w-full sm:w-2/3"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:space-x-3 sm:w-1/2">
                    <label className="sm:w-1/5 semi-bold" htmlFor="qty">
                      QTY<span className="text-error">*</span>
                    </label>
                    <input value={Inputs.qty} onChange={handleInput} name="qty" type="number" className="input input-bordered h-8 w-full sm:w-[61%]" />
                  </div>
                </div>

                <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3">
                  <div className="flex flex-col sm:flex-row sm:space-x-3 sm:w-1/2">
                    <label className="sm:w-[47%] semi-bold" htmlFor="reciptNo">
                      Fr.Machine<span className="text-error">*</span>
                    </label>
                    <select
                      value={Inputs.frmachine}
                      onChange={handleInput}
                      className="input input-bordered h-8 w-full sm:w-2/3"
                      name="frmachine"
                    >
                      <option value="">Select..</option>
                      <option value="Y">Return</option>
                      <option value="N">Received</option>
                    </select>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:space-x-3 sm:w-1/2">
                    <label className="sm:w-1/5 semi-bold" htmlFor="qty">
                      Charges<span className="text-error">*</span>
                    </label>
                    <input value={Inputs.charges} onChange={handleInput} name="charges" type="number" className="input input-bordered h-8 w-full sm:w-[61%]" />
                  </div>
                </div>

                <h2>
                  <span className="flex justify-center text-sm font-semibold">Return/Received</span>
                </h2>
                <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3">
                  <div className="flex flex-col sm:flex-row sm:space-x-3 sm:w-1/2">
                    <label className="sm:w-[47%] semi-bold" htmlFor="reciptNo">
                      Status<span className="text-error">*</span>
                    </label>
                    <select value={recStatus} onChange={(e)=>setrecStatus(e.target.value)} className="input input-bordered h-8 w-full sm:w-2/3" name="rec_status">
                      <option value=""></option>
                      <option value="Y">Return</option>
                      <option value="N">Received</option>
                    </select>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:space-x-3 sm:w-1/2">
                    <label className="sm:w-1/5 semi-bold" htmlFor="qty">
                      Date<span className="text-error">*</span>
                    </label>
                    <input value={recDate} onChange={(e)=>setrecDate(e.target.value)} name="rec_date" type="date" className="input input-bordered h-8 w-full sm:w-[61%]" />
                  </div>
                </div>

                <div className="flex justify-center space-x-3">
                  <button type="submit" className="btn btn-sm btn-outline btn-success">
                    Submit
                  </button>
                  <button onClick={handleCancel} type="button" className="btn btn-sm btn-outline">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
  <form method="dialog" className="modal-backdrop">
    <button onClick={handleCancel}>close</button>
  </form>
</dialog>
    
      <DeptModal />
      <FirmModal />
      <NameModal />
      <PostTypeModal />
    </>
  );
};

export default EditOutModal;
