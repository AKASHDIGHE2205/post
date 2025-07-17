import Navbar from './Components/Navbar/Navbar';

import { Navigate, Route, Routes, } from 'react-router-dom';

import InwardEntry from "./Components/Transaction/InwardEntry/InwardEntry";
import OutwardEntry from "./Components/Transaction/OutwardEntry/OutwardEntry";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import StampEntry from "./Components/Transaction/StampEntry/StampEntry";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import VoucherEntry from './Components/Transaction/VoucherEntry/VoucherEntry';
import InwardEntryView from './Components/Transaction/InwardEntry/InwardEntryView';
import OutwardEntryView from './Components/Transaction/OutwardEntry/OutwardEntryView';
import StampEntryView from './Components/Transaction/StampEntry/StampEntryView';
import VoucherEntryView from './Components/Transaction/VoucherEntry/VoucherEntryView';
import CashVoucher from './Components/Reports/Cash Voucher/CashVoucher';
import InOutRegister from './Components/Reports/InOutRegister/InOutRegister';
import LedgerDetails from './Components/Reports/Ledger Details/LedgerDetails';
import LedgerSummary from './Components/Reports/Ledger Summary/LedgerSummary';
import PurchaseRegister from './Components/Reports/Purchase Register/PurchaseRegister';
import OutwardDetailsEntry from './Components/Transaction/OutwardDetailsEntry/OutwardDetailsEntry';
import CodeMasterView from './Components/Configuration/CodeMaster/CodeMasterView';
import CreateNewGroup from './Components/Configuration/CodeMaster/CreateNewGroup';
import Logout from './Components/Auth/Logout';
import Home from './Components/Home/Home';



function App() {

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  console.log(isAuthenticated);


  return (
    <>

      <Navbar />
      <Routes>
        {!isAuthenticated ? (<>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/*' element={<Navigate to="/login" />} />
          
           


        </>) : (<>

          <Route path='/' element={<Home />} />
          <Route path="/stampentry" element={<StampEntry />} />
          <Route path="/stampentryview" element={<StampEntryView />} />

          <Route path="/voucherentry" element={<VoucherEntry />} />
          <Route path="/voucherentryview" element={<VoucherEntryView />} />

          <Route path="/inwardentry" element={<InwardEntry />} />
          <Route path="/inwardentryview" element={<InwardEntryView />} />
          <Route path="/outwardentry" element={<OutwardEntry />} />
          <Route path="/outwardentryview" element={<OutwardEntryView />} />
          <Route path='/outwarddetailsentry' element={<OutwardDetailsEntry />} />

          {/* report */}
          <Route path="/inout" element={<InOutRegister />} />
          <Route path="/purchaseregiser" element={<PurchaseRegister />} />
          <Route path="/ledgerdetails" element={<LedgerDetails />} />
          <Route path="/ledgersummary" element={<LedgerSummary />} />
          <Route path="/cashvoucherreport" element={<CashVoucher />} />

          <Route path="/logout" element={<Logout />} />

          {/* Configureration */}
          <Route path="/codemasterview" element={<CodeMasterView />} />
          <Route path="/createnewgroup" element={<CreateNewGroup />} />

        </>)}





      </Routes>

    </>
  );
}

export default App;