import { useState, useEffect, FormEvent, FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import DeptModal from "./DeptModal";
import FirmModal from "./FirmModal";
import PostTypeModal from "./PostTypeModal";
import { RootState } from "../../../store/store";
import { handleSelectDept, handleSelectFirm, handleSelectPostType } from "../../../Features/PostEntry/PostEntrySlice";
import { editInwardEntry } from "../../../Services/Transaction/TransactionsAPI";
import { formatDate } from "../../Helper/Helper";

interface Edit {
  items: any;
  fetchData:any

}

const EditModal: FC<Edit> = ({ items,fetchData }) => {
  const [Inputs, setInputs] = useState({
    inwardDate: "",
    name: "",
    city: "",
    remark: "",
    reciptno: "",
    qty: "",
  });
  const { user } = useSelector((state: RootState) => state.auth);
  const { dept_id, dept_name, firm_id, firm_name, post_id, post_name } = useSelector((state: RootState) => state.postentry);
  const dispatch = useDispatch();
  const name = JSON.parse(user);

  useEffect(() => {
    const formattedDate = items.entry_date ? formatDate(items.entry_date) : "";
    setInputs({
      inwardDate: formattedDate,
      name: items.party_name,
      city: items.city_name,
      remark: items.remark,
      reciptno: items.reciptno,
      qty: items.qty,
    });
    dispatch(handleSelectDept({ id: items.dept_id, name: items.dept_name }));
    dispatch(handleSelectFirm({ id: items.firm_id, name: items.firm_name }));
    dispatch(handleSelectPostType({ id: items.post_id, name: items.post_name }));
  }, [items, dispatch]);



  const handleSubmit = async (e: FormEvent) => {

    e.preventDefault();

    
    let body = {
      flag:"I",
      entry_id: items.entry_id,
      entry_date: Inputs.inwardDate,
      post_type: post_id,
      dept_id: dept_id,
      firm_id: firm_id,
      party_name: Inputs.name,
      city_name: Inputs.city,
      remark: Inputs.remark,
      receipt_no: Inputs.reciptno,
      qty: Inputs.qty,
      loc_id:name.loc_id
    };
    console.log(body);
    (document.getElementById("editModal") as HTMLDialogElement).close();
    fetchData();
    try {
      await editInwardEntry(body);
      setInputs({
        inwardDate: "",
        name: "",
        city: "",
        remark: "",
        reciptno: "",
        qty: "",
      });

      dispatch(handleSelectDept({ id: 0, name: "" }));
      dispatch(handleSelectFirm({ id: 0, name: "" }));
      dispatch(handleSelectPostType({ id: 0, name: "" }));
    } catch (error) {
      console.log(error);
    }

    

  };

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };



   
  const handleCancel = () => {
    (document.getElementById("editModal") as HTMLDialogElement).close();
    dispatch(handleSelectDept({ id: 0, name: "" }));
    dispatch(handleSelectFirm({ id: 0, name: "" }));
    dispatch(handleSelectPostType({ id: 0, name: "" }));
  }
  return (
    <>
      <dialog id="editModal" className="modal">
        <div className="modal-box w-11/12 max-w-4xl">
          <button
            onClick={handleCancel}
            className="btn btn-sm btn-circle btn-ghost float-end sticky top-0"
          >
            ✕
          </button>
          <div className="w-full max-w-4xl rounded-xl  p-8">
            <h1>
              <span className="flex justify-center font-semibold text-xl mb-4">Edit Inward Entry</span>
            </h1>
            <form onSubmit={handleSubmit} className="form-control space-y-5">
              <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3">
                <div className="flex flex-col sm:flex-row sm:space-x-3 sm:w-1/2">
                  <label className="sm:w-[47%] bold" htmlFor="inwardDate">
                    Inward Date
                  </label>
                  <input
                    value={Inputs.inwardDate}
                    onChange={handleInput}
                    name="inwardDate"
                    type="date"
                    placeholder="Type here"
                    className="input input-bordered h-9 w-full sm:w-2/3"
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:space-x-3 sm:w-1/2">
                  <label className="sm:w-1/5 semi-bold" htmlFor="reciptno">
                    DOC No
                  </label>
                  <input readOnly name="reciptno" value={Inputs.reciptno} type="number" className="input input-bordered h-9 w-full sm:w-[61%]" />
                </div>
              </div>
              <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3 mb-5">
                <label className="sm:w-1/4 semi-bold" htmlFor="posttype">
                  Post Type
                </label>
                <div className="join w-full">
                  <input
                    value={post_name}
                    readOnly
                    name="posttype"
                    type="text"
                    className="input input-bordered h-9 w-full sm:w-4/5 join-item"
                  />
                  <button
                    type="button"
                    onClick={() => (document.getElementById("postModal") as HTMLDialogElement).showModal()}
                    className="btn btn-sm h-9 join-item btn-info btn-outline"
                  >
                    Select
                  </button>
                </div>
              </div>

              <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3 mb-5">
                <label className="sm:w-1/4 semi-bold" htmlFor="firm_name">
                  Firm Name
                </label>
                <div className="join w-full">
                  <input
                    value={firm_name}
                    readOnly
                    name="firm_name"
                    type="text"
                    className="input input-bordered h-9 w-full sm:w-4/5 join-item"
                  />
                  <button
                    type="button"
                    onClick={() => (document.getElementById("firmModal") as HTMLDialogElement).showModal()}
                    className="btn btn-sm h-9 join-item btn-info btn-outline"
                  >
                    Select
                  </button>
                </div>
              </div>

              <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3 mb-5">
                <label className="sm:w-1/4 semi-bold" htmlFor="dept_name">
                  Department
                </label>
                <div className="join w-full">
                  <input
                    value={dept_name}
                    readOnly
                    name="dept_name"
                    type="text"
                    className="input input-bordered h-9 w-full sm:w-4/5 join-item"
                  />
                  <button
                    type="button"
                    onClick={() => (document.getElementById("deptModal") as HTMLDialogElement).showModal()}
                    className="btn btn-sm h-9 join-item btn-info btn-outline"
                  >
                    Select
                  </button>
                </div>
              </div>

              <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3 mb-5">
                <label className="sm:w-1/5 semi-bold" htmlFor="name">
                  Name
                </label>
                <input
                  value={Inputs.name}
                  onChange={handleInput}
                  name="name"
                  type="text"
                  className="input input-bordered h-9 w-full sm:w-[71%]"
                />
              </div>

              <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3 mb-5">
                <label className="sm:w-1/5 semi-bold" htmlFor="city">
                  City
                </label>
                <input
                  value={Inputs.city}
                  onChange={handleInput}
                  name="city"
                  type="text"
                  className="input input-bordered h-9 w-full sm:w-[71%]"
                />
              </div>

              <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3 mb-5">
                <label className="sm:w-1/5 semi-bold" htmlFor="remark">
                  Remark
                </label>
                <input
                  value={Inputs.remark}
                  onChange={handleInput}
                  name="remark"
                  type="text"
                  className="input input-bordered h-9 w-full sm:w-[71%]"
                />
              </div>

              <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3 mb-5">
                <div className="flex flex-col sm:flex-row sm:space-x-3 sm:w-1/2">
                  <label className="sm:w-[47%] semi-bold" htmlFor="reciptno">
                    Recipt No
                  </label>
                  <input
                    value={Inputs.reciptno}
                    onChange={handleInput}
                    name="reciptno"
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered h-9 w-full sm:w-2/3"
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:space-x-3 sm:w-1/2">
                  <label className="sm:w-1/5 semi-bold" htmlFor="qty">
                    QTY
                  </label>
                  <input
                    value={Inputs.qty}
                    onChange={handleInput}
                    name="qty"
                    type="number"
                    className="input input-bordered h-9 w-full sm:w-[61%]"
                  />
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
        <form method="dialog" className="modal-backdrop">
          <button onClick={handleCancel}>close</button>
        </form>
      </dialog>

      <DeptModal />
      <FirmModal />
      <PostTypeModal />
    </>
  );
};

export default EditModal;
