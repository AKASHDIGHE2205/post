import { FormEvent, useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import { toast } from "sonner";
import { createNewGroup } from "../../../Services/Configuration/ConfigurationApi";
import { Link, useNavigate } from "react-router-dom";

const CreateNewGroup = () => {
    const [selectedGroup,setselectedGroup] = useState("");
    const [group,setGroup] = useState("");
  const navigate = useNavigate();

     const handleSubmit = async(e:FormEvent)=>{
        e.preventDefault();
        if (!selectedGroup || !group) {
            toast.error("Please Select a Group and Enter a Name");  
            return;          
        }
        let body = {
            Group:selectedGroup,
            name:group,
            status:"A"
        }
        try {
            await createNewGroup(body);
          navigate("/codemasterview");
        } catch (error:any) {
            toast.error(error);
        }


     }
    return (
        <div className="flex justify-center items-center mt-5 ">
            <div className="overflow-x-auto w-full p-2 m-5 shadow-xl rounded-xl  mt-5">
                <h1 className="text-xl flex justify-center mb-7" > Create New Group</h1>
                <form onSubmit={handleSubmit} >
                <div className="flex  gap-5 justify-center mb-5">
                    <label htmlFor="group">Group <span className="text-error">*</span></label>
                    <select onChange={(e)=>setselectedGroup(e.target.value)} className="input input-sm input-bordered w-full max-w-xs" name="type" id="type">
                        <option selected disabled value="">Select Type</option>
                        <option value="F">Firm</option>
                        <option value="D">Department</option>
                        <option value="T">Type</option>
                    </select>
                    <label htmlFor="newgroup">New Group Name <span className="text-error">*</span></label>
                    <input onChange={(e)=>setGroup(e.target.value)} type="text" placeholder="Enter New Group" className="input input-sm input-bordered w-full max-w-xs" />
                </div>
                <div className="flex justify-center gap-3 mb-4">
                    <button className="btn btn-sm btn-outline btn-accent" type="submit"><IoAddSharp size={20} />Submit</button>
                    <Link to="/codemasterview" className="btn btn-sm btn-outline " type="button">Cancel</Link>
                </div>
                </form>
            </div>
        </div>
    )
}

export default CreateNewGroup;
