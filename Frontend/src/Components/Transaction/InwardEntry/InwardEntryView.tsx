import { FC, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Paginations from "../../Helper/Pagination/Pagination";
import ReusableTHeader from "../../Data/ReusableTHeader";
import { EditEntry, getAllInView } from "../../../Services/Transaction/TransactionsAPI";
import moment from "moment";
import { CiEdit } from "react-icons/ci";
import EditModal from "./EditModal";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";

import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const InwardEntryView: FC = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 8;
    const currentdate = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format
    const [date, setDate] = useState(currentdate);
    const [items, setItems] = useState([]);
    const confirmDialogRef = useRef<HTMLDialogElement>(null);
    const navigate = useNavigate();
    const {user} = useSelector((state:RootState)=>state.auth);
const name = JSON.parse(user);
console.log(name.loc_id);

    const handleDate = async () => {
        setLoading(true);
        let body = {
            date: date,
            loc_id:name.loc_id
        }
        try {
            const response = await getAllInView(body);
            setData(response);
            setLoading(false);
        } catch (error: any) {
            toast.error(error.response.data.message);
        }

    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const filteredData = data.filter((item: any) =>
        item.firm_name && item.party_name.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.city_name && item.dept_name.toString().toLowerCase().includes(searchTerm.toLowerCase) ||
        item.entry_id && item.remark.toString().toLowerCase().includes(searchTerm.toLowerCase) ||
        moment(item.entry_date).format("DD/MM/YYYY") && moment(item.entry_date).format("DD/MM/YYYY").toString().toLowerCase().includes(searchTerm.toString())
    );
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const handleCreateButton = () => {
        navigate("/inwardentry");
    };

    const handleEdit = (item: any) => {
        (document.getElementById('editModal') as HTMLDialogElement).showModal();
        setItems(item);
    };
    const handleDelete = async (item: any) => {
        const dialog = confirmDialogRef.current;
        if (dialog) {
            dialog.showModal();
             
            let body = {
                item:item,
                loc_id:name.loc_id
            }
            const handleConfirm = async () => {
                try {
                    await EditEntry(body);
                    toast.success("Item deleted successfully.");
                    handleDate();
                    // Optionally, refresh data or navigate away
                } catch (error:any) {
                    toast.error(error.message);
                } finally {
                    dialog.close();
                }
            };

            const handleCancel = () => {
                dialog.close();
            };

            dialog.querySelector('#confirmBtn')?.addEventListener('click', handleConfirm, { once: true });
            dialog.querySelector('#cancelBtn')?.addEventListener('click', handleCancel, { once: true });
        }
    };




    return (
        <>
            <div className="flex justify-center items-center">
                <div className="overflow-x-auto w-full p-2 m-5 shadow-xl rounded-xl">
                    <ReusableTHeader setSearchTerm={setSearchTerm} name="List of Inward Entries" createButtonAction={handleCreateButton} />
                    <div className="w-full space-x-3 mb-3">
                        <input value={date} onChange={(e) => setDate(e.target.value)} className="input input-sm input-bordered max-w-xs" type="date" />
                        <button onClick={handleDate} className="btn btn-sm btn-outline btn-primary" type="button">Refresh Data</button>
                    </div>
                    <table className="table table-zebra">
                        <thead className="btn-sm font-bold bg-base-200 text-sm">
                            <tr>
                                <th>Entry Id</th>
                                <th>Entry Date</th>
                                <th>To</th>
                                <th>Post Name</th>
                                <th>Department Name</th>
                                <th>Firm Name</th>
                                <th>City Name</th>
                                <th>Remark</th>
                                <th>Receipt No</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        {loading ? (
                            <tbody>
                                <tr>
                                    <td colSpan={10} className="text-center">
                                        <div className="flex justify-center items-center font-bold">
                                           -: No Record Found :-
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        ) : (
                            currentItems.map((item: any, index: number) => (
                                <tbody key={index}>
                                    <tr>
                                        <td>{item.entry_id}</td>
                                        <td>{moment(item.entry_date).format("DD/MM/YYYY")}</td>
                                        <td>{item.party_name}</td>
                                        <td>{item.post_name}</td>
                                        <td>{item.dept_name}</td>
                                        <td>{item.firm_name}</td>
                                        <td>{item.city_name}</td>
                                        <td>{item.remark}</td>
                                        <td>{item.receipt_no}</td>
                                        <td className="flex justify-start gap-3">
                                            <button onClick={() => handleEdit(item)} className="btn btn-xs btn-outline btn-accent" type="button">
                                                <CiEdit size={20} />
                                            </button>
                                            <button onClick={() => handleDelete(item)} className="btn btn-xs btn-outline btn-error" type="button">
                                                <MdDelete size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            ))
                        )}
                    </table>
                </div>
            </div>

            {!loading && <Paginations currentPage={currentPage} itemperPage={itemsPerPage} handlePageChange={handlePageChange} data={data} />}
            <EditModal fetchData = {handleDate} items={items} />
            <dialog id="confirm" className="modal" ref={confirmDialogRef}>
                <div className="modal-box">
                    <p className="py-4 font-bold text-lg">Are you sure you want to delete this item?</p>
                    <div className="flex justify-center gap-5">
                        <button id="confirmBtn" className="btn btn-md btn-success btn-outline" type="button">Yes</button>
                        <button id="cancelBtn" onClick={() => confirmDialogRef.current?.close()} className="btn btn-md btn-error btn-outline" type="button">No</button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
};

export default InwardEntryView;
