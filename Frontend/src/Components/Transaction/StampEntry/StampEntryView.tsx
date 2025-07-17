import moment from "moment"
import { FC, useState } from "react"
import ReusableTHeader from "../../Data/ReusableTHeader"
import Paginations from "../../Helper/Pagination/Pagination"
import withDataFetching from "../../../HOC/withDataFetching"
import { DeleteStampEntry, getStamps } from "../../../Services/Transaction/TransactionsAPI"
import { useNavigate } from "react-router-dom"
import { CiEdit } from "react-icons/ci"
import EditStampModal from "./EditStampModal"
import { MdDelete } from "react-icons/md"
import { toast } from "sonner"


interface HOCData {
    data: any,
    loading: boolean,
    currentPage: number
    setSearchTerm: any
    handlePageChange: ()=>void;
    fitem:any
    itemperPage: number

}


const StampEntryView: FC<HOCData> = ({ data, currentPage, setSearchTerm, handlePageChange, itemperPage, loading,fitem }) => {
       const [items,setItems] = useState([]);
    const navigate = useNavigate();
    const handleCreateButton = () => {
        navigate("/stampentry")

    }

    let loadingfall = <h1 className="flex justify-center"><span className=" loading loading-spinner text-info"></span></h1>
    const handleEdit = (item:any)=>{
        setItems(item);
        (document.getElementById("editstampModal")as HTMLDialogElement).showModal();
    }

    const handleDelete = async (id: any) => {
        try {
            await DeleteStampEntry(id);
            window.location.reload();
        } catch (error: any) {
            toast.error(error);
        }

    }
    return (
        <>
            <div className="flex justify-center items-center ">
                <div className="overflow-x-auto w-full p-2 m-5 shadow-xl rounded-xl ">
                    <ReusableTHeader setSearchTerm={setSearchTerm} name="List of Stamp Entries" createButtonAction={handleCreateButton} />
                    {loading ? loadingfall : (
                        <table className="table table-zebra ">
                            {/* head */}
                            <thead className=" btn-sm font-bold bg-base-200  text-sm">
                                <tr className="" >
                                    <th>Stamp Id</th>
                                    <th>Purchase Date</th>
                                    <th>Firm Name</th>
                                    <th>Rec No</th>
                                    <th>Pay Date</th>
                                    <th>Stamp</th>
                                    <th>Fr Machine</th>
                                    <th>Remark</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            {fitem.map((item: any, index: number) => (
                                <tbody key={index}>
                                    <tr>
                                        <td>{item.stamp_id}</td>
                                        <td>{moment(item.pur_date).format("DD/MM/YYYY")}</td>
                                        <td>{item.firm_name}</td>
                                        <td>{item.rec_no}</td>
                                        <td>{moment(item.pay_date).format("DD/MM/YYYY")}</td>
                                        <td>{item.stamp}</td>
                                        <td>{item.fr_machine}</td>
                                        <td>{item.remark}</td>
                                        <td className="flex justify-start gap-3"><button onClick={() => handleEdit(item)} className="btn  btn-xs btn-outline btn-accent" type="button"><CiEdit size={20} /></button>
                                            <button onClick={() => handleDelete(item.stamp_id)} className="btn btn-xs btn-outline btn-error" type="button"><MdDelete size={20} /></button>
                                        </td>

                                    </tr>

                                </tbody>
                            ))}
                        </table>
                    )}

                </div>
            </div >
         <EditStampModal items= {items}/>
            {/* pagination */}
            {!loading && < Paginations currentPage={currentPage} itemperPage={itemperPage} handlePageChange={handlePageChange} data={data} />}

        </>
    )
}

export default withDataFetching(getStamps, ["firm_name","pur_date","pay_date","rec_no","stamp","fr_machine"] )(StampEntryView);
