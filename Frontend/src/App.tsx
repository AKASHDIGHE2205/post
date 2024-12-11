import Navbar from './Components/Navbar/Navbar';

import { Route, Routes, } from 'react-router-dom';

import InwardEntry from "./Components/Transaction/InwardEntry/InwardEntry";
import OutwardEntry from "./Components/Transaction/OutwardEntry/OutwardEntry";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import StampEntry from "./Components/Transaction/StampEntry/StampEntry";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import InOutRegister from './Components/Reports/InOutRegister/InOutRegister';
import PurchaseRegister from './Components/Reports/Purchase Register/PurchaseRegister';
import LedgerDetails from './Components/Reports/Ledger Details/LedgerDetails';
import LedgerSummary from './Components/Reports/Ledger Summary/LedgerSummary';
import CashVoucher from './Components/Reports/Cash Voucher/CashVoucher';
import Test from './Components/Test/Test';



function App() {

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  console.log(isAuthenticated);


  return (
    <>

      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" />
        <Route path="/inwardentry" element={<InwardEntry />} />
        <Route path="/outwardentry" element={<OutwardEntry />} />
        <Route path="/stampentry" element={<StampEntry />} />
        <Route path="/inout" element={<InOutRegister />} />
        <Route path="/purchaseregiser" element={<PurchaseRegister />} />
        <Route path="/ledgerdetails" element={<LedgerDetails />} />
        <Route path="/ledgersummary" element={<LedgerSummary />} />
        <Route path="/cashvoucherreport" element={<CashVoucher />} />
        <Route path="/test" element={<Test />} />
      </Routes>

    </>
  );
}

export default App;