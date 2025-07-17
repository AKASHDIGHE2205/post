import express from 'express';
import cors from "cors";
import transactionRoutes from "./Routes/transactionRoutes.js";
import reportRoutes from "./Routes/reportRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
import StMasterRoutes from './Routes/st_master/MasterRoutes.js';
import StTransactionRoutes from './Routes/st_transaction/TransactionRoutes.js';
import StauthRoutes from './Routes/st_auth/authRoutes.js';
import PMasterRoutes from './Routes/property/master/PMasterRoutes.js'
import PTranRoutes from './Routes/property/transaction/PTransRoutes.js';
import PReportRoutes from './Routes/property/report/PReportRoutes.js'
import path from 'path';
import { fileURLToPath } from 'url';


const Server = express();
const port = 5003;
Server.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

Server.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Enable CORS middleware
Server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//POST ROUTES
Server.use(transactionRoutes);
Server.use(reportRoutes);
Server.use(authRoutes);

//STORE APP ROUTES
Server.use(StMasterRoutes);
Server.use(StTransactionRoutes);
Server.use(StauthRoutes)
Server.use(PMasterRoutes);
Server.use(PTranRoutes);
Server.use(PReportRoutes);

Server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
