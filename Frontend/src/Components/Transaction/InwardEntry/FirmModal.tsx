import { FC } from "react";
import { BsCheck2Square } from "react-icons/bs";
import { useDispatch } from "react-redux";
import Paginations from "../../Helper/Pagination/Pagination";
import { handleSelectFirm } from "../../../Features/PostEntry/PostEntrySlice";
import { getFirm } from "../../../Services/Transaction/TransactionsAPI";
import withDataFetching from "../../../HOC/withDataFetching";


interface HOCData {
  data: any,
  loading: boolean,
  currentPage: number
  setSearchTerm: any
  handlePageChange: ()=>void;
  fitem:any;
  itemperPage: number

}

const FirmModal:FC<HOCData> = ({ data, currentPage, setSearchTerm, handlePageChange, itemperPage,fitem }) => {
    const dispatch = useDispatch();

    
      const handleSelect = (item: any) => {
        dispatch(handleSelectFirm({ id: item.firm_id, name: item.firm_name }));
        (document.getElementById("firmModal") as HTMLDialogElement).close();
      }
  return (

    <dialog id="firmModal" className="modal">
    
    <div className="modal-box">
      <button
        onClick={() => (document.getElementById("firmModal") as HTMLDialogElement)?.close()}
        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
      >
        ✕
      </button>
      <div className="sticky left-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <h1 className="text-xl font-bold">Select Firm from list...!</h1>
          </div>
        </div>
        <div className="flex justify-end mb-4">
          <label className="input input-bordered input-sm flex items-center w-full sm:w-auto">
            <input
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              className="grow"
              placeholder="Search"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
      </div>
      <div className="overflow-x-auto w-full mb-3">
        <table className="table">
          <thead className="bg-base-300">
            <tr>
              <th>ID</th>
              <th>Firm</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {fitem.map((item: any, index: number) => (
              <tr key={index}>
                <td>{item.firm_id}</td>
                <td>{item.firm_name}</td>
                <td>
                  <button className="btn btn-sm btn-info btn-outline" onClick={()=>handleSelect(item)} >
                    <BsCheck2Square size={15} /> Select
                  </button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
      <Paginations currentPage={currentPage} itemperPage={itemperPage} handlePageChange={handlePageChange} data={data} />
      <button
        onClick={() => (document.getElementById("firmModal") as HTMLDialogElement)?.close()}
        className="btn float-end p-2 mt-2 btn-sm btn-outline"   >
        Close
      </button>
    </div>
    <form method="dialog" className="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
  )
};

export default withDataFetching(getFirm,["firm_name"])(FirmModal);
