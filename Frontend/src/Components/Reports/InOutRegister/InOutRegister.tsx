// src/components/InOutRegister.tsx
import { useDispatch, useSelector } from "react-redux";
import FirmModal from "../../Transaction/InwardEntry/FirmModal";
import PostTypeModal from "../../Transaction/InwardEntry/PostTypeModal";
import { RootState } from "../../../store/store";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { getInOutReport } from "../../../Services/Reports/ReportApi";
import moment from "moment";
import { BsDownload } from "react-icons/bs";
import { GoArrowLeft } from "react-icons/go";
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import PrintableReport from './PrintableReport';
import { handleSelectFirm, handleSelectPostType } from "../../../Features/PostEntry/PostEntrySlice";
import axios from "axios";

const InOutRegister = () => {
  const dispatch = useDispatch();
  const { post_id, post_name, firm_id, firm_name } = useSelector((state: RootState) => state.postentry);
  const {user} = useSelector((state: RootState) => state.auth);
  const name = JSON.parse(user);

  const [data, setData] = useState<any[]>([]);
  const [totalsum,setTotalSum] = useState([]);
  const componentPdf = useRef<HTMLDivElement | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [show, setShow] = useState(false);
  const startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 2).toISOString().split('T')[0];
  const currentdate = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format
  const [Inputs, setInputs] = useState({
    fromdate: startDate,
    todate: currentdate,
    register: "",
    reporttype: "",
  });
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!Inputs.fromdate || !Inputs.todate || !Inputs.register) {
      toast.error("Field Required");
      return;
    }

    
    setShow(true);
    let body = {
      from_date: Inputs.fromdate,
      to_date: Inputs.todate,
      flag: Inputs.register,
      post_type: post_id || 0,
      firm_id: firm_id || 0,
      loc_id:name.loc_id
    };
    console.log(body);
    const response = await axios.post("http://192.168.182.26:5003/getInOutSum",body);
    if (response.status === 200) {
      
      setTotalSum(response.data)
    }
    try {
      const response = await getInOutReport(body);
      setData(response);
    } catch (error: any) {
      toast.error(error);
    }
  };

  const handleInputs = (e: any) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const generatePdf = useReactToPrint({
    content: () => componentPdf.current,
    // documentTitle: `${Inputs.register}" "${Inputs.fromdate} "TO"${Inputs.todate}`,
  });
  
  const filteredData = data.filter((item: any) =>
    item.post_type && item.post_type.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.entry_id && item.entry_id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.firm_name && item.firm_name.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.dept_name && item.dept_name.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.party_name && item.party_name.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.city_name && item.city_name.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.receipt_no && item.receipt_no.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    moment(item.entry_date).format("DD/MM/YYYY").toString().includes(searchTerm.toString())
  );

  const handleBack = () => {
    setShow(false);
    dispatch(handleSelectFirm({id:0,name:""}));
    dispatch(handleSelectPostType({id:0,name:""}));
    setInputs({
      fromdate: startDate,
      todate: currentdate,
      register: "",
      reporttype: "",
    });
  }

  return (
    <>
      {!show && (
        <div className="flex justify-center p-4">
          <div className="w-full max-w-4xl rounded-xl shadow-xl p-8">
            <h1>
              <span className="flex justify-center font-semibold text-lg mb-4">
                Inward/Outward Register...
              </span>
            </h1>
            <form onSubmit={handleSubmit} className="form-control space-y-5">
              <div className="flex flex-col space-y-5">
                <div className="flex flex-col sm:flex-row sm:space-x-3">
                  <div className="flex flex-col sm:flex-row sm:w-1/2 sm:items-center mb-2">
                    <label className="sm:w-[30%] mb-1 bold" htmlFor="period">
                      From Date<span className="text-error">*</span>
                    </label>
                    <input
                      value={Inputs.fromdate}
                      onChange={handleInputs}
                      name="fromdate"
                      type="date"
                      placeholder="Type here"
                      className="input input-bordered h-9 w-full sm:w-[70%]"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:w-1/2 sm:items-center">
                    <label className="sm:w-[25%] mb-2 semi-bold" htmlFor="interestRate">
                      To Date<span className="text-error">*</span>
                    </label>
                    <input
                      value={Inputs.todate}
                      onChange={handleInputs}
                      name="todate"
                      type="date"
                      placeholder="Type here"
                      className="input input-bordered h-9 w-full sm:w-[70%]"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:space-x-3">
                  <div className="flex flex-col sm:flex-row sm:w-1/2 sm:items-center mb-2">
                    <label className="sm:w-[43%] mb-1 bold" htmlFor="period">
                      Register<span className="text-error">*</span>
                    </label>
                    <select
                      onChange={handleInputs}
                      name="register"
                      className="select select-bordered w-full max-w-xs select-sm"
                    >
                      <option disabled selected>
                        Select Type
                      </option>
                      <option value="I">Inward</option>
                      <option value="O">Outward</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3 mb-5">
                  <label className="sm:w-[15%] mb-1 bold" htmlFor="interestAC">
                    Post Type
                  </label>
                  <div className="join w-full">
                    <input
                      name="interestac"
                      type="text"
                      placeholder="[All]"
                      className="input input-bordered h-9 w-full sm:w-4/5 join-item"
                      defaultValue={post_name}
                      readOnly
                    />
                    <button
                      type="button"
                      className="btn btn-sm h-9 join-item btn-info btn-outline"
                      onClick={() => (document.getElementById("postModal") as HTMLDialogElement).showModal()}
                    >
                      Select
                    </button>
                  </div>
                </div>
                <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3 mb-5">
                  <label className="sm:w-[15%] mb-1 bold" htmlFor="interestAC">
                    Firm Name
                  </label>
                  <div className="join w-full">
                    <input
                      name="interestac"
                      type="text"
                      placeholder="[All]"
                      className="input input-bordered h-9 w-full sm:w-4/5 join-item"
                      defaultValue={firm_name}
                      readOnly
                    />
                    <button
                      type="button"
                      className="btn btn-sm h-9 join-item btn-info btn-outline"
                      onClick={() => (document.getElementById("firmModal") as HTMLDialogElement).showModal()}
                    >
                      Select
                    </button>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:space-x-3">
                  <div className="flex flex-col sm:flex-row sm:w-1/2 sm:items-center mb-2">
                    <label className="sm:w-[43%] mb-1 bold" htmlFor="period">
                      Report Type
                    </label>
                    <select
                      onChange={handleInputs}
                      name="reporttype"
                      className="select select-bordered w-full max-w-xs select-sm"
                    >
                      <option disabled selected>
                        Select Type
                      </option>
                      <option value="">Details</option>
                      <option value="">Summary</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-center gap-4">
                  <button type="submit" className="btn btn-sm h-10 btn-success btn-outline">
                    Submit
                  </button>
                  <button type="button" className="btn btn-sm btn-outline btn-neutral h-10">
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {show && (
        <>
          <div className="flex justify-center ">
            <div className="w-full rounded-xl shadow-xl ">
              <div className="flex justify-between w-full mb-1 sticky top-0 p-5">
                <button className="btn btn-sm btn-primary btn-outline" onClick={handleBack}>
                  <GoArrowLeft /> Back
                </button>
                <button className="btn btn-sm btn-warning " onClick={generatePdf}>
                  <BsDownload /> Download
                </button>
              </div>
              <div className="flex justify-end mr-8 sticky top-0 ">
                <div className="sticky top-0 ">
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
              <div className="overflow-x-auto w-full shadow-xl rounded-xl">
                <div className="m-4 p-4 " ref={componentPdf}>
                  <PrintableReport totalsum={totalsum} data={filteredData} inputs={Inputs} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <PostTypeModal />
      <FirmModal />
    </>
  );
};

export default InOutRegister;
