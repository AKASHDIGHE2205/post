import { useState, useEffect } from "react";
import { BsCheck2Square } from "react-icons/bs";
import { getNames } from "../../../Services/Transaction/TransactionsAPI";
import Paginations from "../../Helper/Pagination/Pagination";
import { handlePartyNames } from "../../../Features/PostEntry/PostEntrySlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";

const NameModal = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemperPage = 5;


  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getNames();
        setData(response);
      } catch (error) {
        console.log("Something Went wrong...!")
      }
    }
    fetchData();
  }, [])
  const indexOfLastItem = currentPage * itemperPage;
  const indexOfFirstItem = indexOfLastItem - itemperPage;

  const currentItems = data.filter((item: any) =>
    (item.party_name && item.party_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.city_name && item.city_name.toLowerCase().includes(searchTerm.toLowerCase()))
  ).slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  }

  const handleSelect = (item: any) => {
    dispatch(handlePartyNames({ id: item.party_id, name: item.party_name, city:item.city_name, party_city:item.party_city }));
    (document.getElementById("NameModal") as HTMLDialogElement).close();
  }


  return (
    <dialog id="NameModal" className="modal">

      <div className="modal-box">
        <button
          onClick={() => (document.getElementById("NameModal") as HTMLDialogElement)?.close()}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        <div className="sticky left-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <h1 className="text-xl font-bold">Select Type from list...!</h1>
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
                <th>Party Name</th>
                <th>City Name</th>

                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item: any, index: number) => (
                <tr key={index} >
                  <td>{item.party_id}</td>
                  <td>{item.party_name}</td>
                  <td>{item.city_name}</td>
                  <td>
                    <button className="btn btn-sm btn-info btn-outline" onClick={() => handleSelect(item)} >
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
          onClick={() => (document.getElementById("NameModal") as HTMLDialogElement)?.close()}
          className="btn float-end p-2 mt-2 btn-sm btn-outline"   >
          Close
        </button>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}

export default NameModal;
