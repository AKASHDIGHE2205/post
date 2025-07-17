import { FormEvent, useState } from "react";
import ReusableTHeader from "../../Data/ReusableTHeader";

import { CiEdit, CiSearch } from "react-icons/ci";
import axios from "axios";
import Paginations from "../../Helper/Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { MdDelete } from "react-icons/md";
import { IoAddSharp } from "react-icons/io5";

const CodeMasterView = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [selectedGroup, setselectedGroup] = useState("");
    const [newGroupName, setGroupName] = useState("");
    const [selectedId, setSelectedId] = useState("");
    const handleViewBtn = async () => {
        if (!selectedGroup) {
            toast.error("Please Select Group!")
            return;
        }
        let body = {
            Group: selectedGroup
        }
        try {
            const response = await axios.post("http://192.168.182.26:5003/viewGroup", body);
            setData(response.data);
        } catch (error) {
            console.log(error);

        }

    }
    const navigate = useNavigate();

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const filteredData = data.filter((item: any) =>
        item.id && item.name.toString().toLowerCase().includes(searchTerm.toLowerCase())

    );

    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    console.log(currentItems);

    const handleCreateButton = () => {
        navigate("/createnewgroup");
    }

    const handleEdit = (item: any) => {
        (document.getElementById("editModal") as HTMLDialogElement).showModal();
        setSelectedId(item.id);

    }
    const handleDelete = async (id: any) => {
        let body = {
            Group: selectedGroup,
            id: id,
            status: "I"
        }
        try {
            const response = await axios.put("http://192.168.182.26:5003/delGroup", body);
            if (response.status === 200) {
                toast.success(response.data.message);

            }

        } catch (error: any) {
            toast.error(error.response.message)
        }

    }
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        let body = {
            Group: selectedGroup,
            name: newGroupName,
            id: selectedId
        }
        console.log(body);
        (document.getElementById("editModal") as HTMLDialogElement).close();
        handleViewBtn();
        setGroupName("");
        try {
            const response = await axios.put("http://192.168.182.26:5003/editGroup", body);
            if (response.status === 200) {
                toast.success(response.data.message);

            }

        } catch (error: any) {
            toast.error(error.response.message)
        }

    }
    return (
        <>
            <div className="flex justify-center items-center ">
                <div className="overflow-x-auto w-full p-2 m-5 shadow-xl rounded-xl ">
                    <ReusableTHeader setSearchTerm={setSearchTerm} name="List of Groups" createButtonAction={handleCreateButton} />
                    <div className="flex mb-3 gap-5">
                        <label htmlFor="group">Group <span className="text-error">*</span></label>
                        <select onChange={(e) => setselectedGroup(e.target.value)} className="input input-sm input-bordered w-full max-w-xs" name="type" id="type">
                            <option selected disabled value="">Select Master</option>
                            <option value="F">Firm</option>
                            <option value="D">Department</option>
                            <option value="T">Type</option>
                        </select>
                        <button onClick={handleViewBtn} className="btn btn-sm btn-outline" type="button"><CiSearch size={20} />View</button>
                    </div>
                    <table className="table table-zebra ">
                        {/* head */}
                        <thead className=" btn-sm font-bold bg-base-200  text-sm">
                            <tr className="" >
                                <th>ID</th>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className={`${data.length > 0 ? "" : "skeleton"} h-4 text-sm`}>
                            {currentItems.map((item: any, index: number) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td className="flex"><button onClick={() => handleEdit(item)} className="btn btn-xs btn-accent btn-outline " type="button"><CiEdit size={20} /></button>
                                        <button onClick={() => handleDelete(item.id)} className="btn btn-xs ml-3 btn-error btn-outline" type="button"><MdDelete size={20} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>
            </div >
            <Paginations itemperPage={itemsPerPage} data={data} handlePageChange={handlePageChange} currentPage={currentPage} />

            {/* Open the modal using document.getElementById('ID').showModal() method */}

            <dialog id="editModal" className="modal">
                <div className="modal-box  max-w-4xl">

                    <div className="overflow-x-auto w-full rounded-xl ">
                        <h1 className="text-xl flex justify-center mb-7" > Create New Group</h1>
                        <form onSubmit={handleSubmit} >
                            <div className="flex  gap-5 justify-center mb-5">

                                <label htmlFor="newgroup">New Group Name <span className="text-error">*</span></label>
                                <input value={newGroupName} onChange={(e) => setGroupName(e.target.value)} type="text" placeholder="Enter New Group" className="input input-sm input-bordered w-full max-w-xs" />
                            </div>
                            <div className="flex justify-center gap-3 mb-4">
                                <button className="btn btn-sm btn-outline btn-accent" type="submit"><IoAddSharp size={20} />Update</button>
                                <button onClick={() => (document.getElementById("editModal") as HTMLDialogElement).close()} className="btn btn-sm btn-outline " type="button">Cancel</button>
                            </div>
                        </form>
                    </div>

                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}

export default CodeMasterView;
