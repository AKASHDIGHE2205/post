import React from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

interface PrintableReportProps {
  data: any[];
  totalsum: { firm_id: number; firm_name: string; total_qty: number; total_charges: number }[];
  inputs: {
    fromdate: string;
    todate: string;
  };
}

const PrintableReport: React.FC<PrintableReportProps> = ({ data, inputs, totalsum }) => {
  const { firm_name, post_name } = useSelector((state: RootState) => state.postentry);
  console.log(totalsum);

  // Group data by firm_id
  const groupedData = data.reduce((acc: { [key: number]: any[] }, item) => {
    if (!acc[item.firm_id]) {
      acc[item.firm_id] = [];
    }
    acc[item.firm_id].push(item);
    return acc;
  }, {});

  // Extract firm names from data dynamically
  const firmNames: { [key: number]: string } = {};
  data.forEach(item => {
    if (!firmNames[item.firm_id]) {
      firmNames[item.firm_id] = item.firm_name; // assuming `firm_name` is available in `data`
    }
  });

  const Header = ({ firmName }: { firmName: string }) => (
    <>
      <h1 className="text-lg font-bold text-center">
        Malpani Group, Sangmaner
      </h1>
      <h2 className="text-lg font-semibold mb-4 text-center">
        Register For Period From {moment(inputs.fromdate).format("DD/MM/YYYY")} To {moment(inputs.todate).format("DD/MM/YYYY")}
      </h2>
      <div className='flex flex-col justify-start font-semibold text-md mb-4'>
        <div>Firm Name: {firmName}</div>
        <div>Post Type: {post_name ? post_name : "[All]"}</div>
      </div>
      <hr className="border-dashed font-extrabold bg-gray-950 mb-4" />
    </>
  );

  return (
    <div className="printable-content p-4 mr-3">
      {Object.keys(groupedData).map((firmIdStr, index) => {
        const firmId = parseInt(firmIdStr, 10);
        const firmData = groupedData[firmId];
        const firmName = firmNames[firmId] || "Unknown Firm"; // Provide a default name
        const firmTotals = totalsum.find(sum => sum.firm_id === firmId);

        return (
          <div key={index} className="firm-section">
            {/* Display the header and firm name */}
            <Header firmName={firmName} />
            <table className="min-w-full border-collapse border border-gray-300 mb-4">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 p-2">Rec No</th>
                  <th className="border border-gray-300 p-2">Department Name</th>
                  <th className="border border-gray-300 p-2">DOC. Date</th>
                  <th className="border border-gray-300 p-2">DOC No.</th>
                  <th className="border border-gray-300 p-2">To</th>
                  <th className="border border-gray-300 p-2">City Name</th>
                  <th className="border border-gray-300 p-2">QTY</th>
                  <th className="border border-gray-300 p-2">Amt</th>
                  <th className="border border-gray-300 p-2">Remark</th>
                  <th className="border border-gray-300 p-2">Rec. Date</th>
                  
                </tr>
              </thead>
              <tbody>
                {firmData.map((item: any, rowIndex: number) => (
                  <tr key={rowIndex}>

                    <td className="border border-gray-300 p-2">{item.receipt_no}</td>
                    <td className="border border-gray-300 p-2">{item.dept_name}</td>
                    <td className="border border-gray-300 p-2">{moment(item.entry_date).format("DD/MM/YYYY")}</td>
                    <td className="border border-gray-300 p-2">{item.entry_id}</td>
                    <td className="border border-gray-300 p-2">{item.party_name}</td>
                    <td className="border border-gray-300 p-2">{item.city_name}</td>
                    <td className="border border-gray-300 p-2">{item.qty}</td>
                    <td className="border border-gray-300 p-2">{item.charges}</td>
                    <td className="border border-gray-300 p-2">{item.remark}</td>
                    <td className="border border-gray-300 p-2">{item.rec_date}</td>
                    
                  </tr>
                ))}
                {/* Display total sum for the firm */}
                {firmTotals && (
                  <tr>
                    {/* <td className='text-sm font-bold'>{firmTotals.firm_name}</td> */}
                    <td colSpan={6} className="border border-gray-300 p-2 text-right font-semibold">{`Total [${firmTotals.firm_name}]`}</td>
                    <td className="border border-gray-300 p-2 font-semibold">{firmTotals.total_qty}</td>
                    <td className="border border-gray-300 p-2 font-semibold">{firmTotals.total_charges}</td>
                    <td colSpan={2} className="border border-gray-300 p-2"></td>
                  </tr>
                )}
              </tbody>
            </table>
            {index < Object.keys(groupedData).length - 1 && (
              <div className="page-break"></div>
            )}
          </div>
        );
      })}
      <style>
        {`
          @page {
            size: A4;
            margin: 10mm;
          }
          .printable-content {
            position: relative;
          }
          .printable-content::after {
            content: "Page " counter(page);
            position: absolute;
            bottom: 10px;
            right: 10px;
            font-size: 12px;
            color: #000;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            word-wrap: break-word;
            padding: 8px;
            text-align: left;
            vertical-align: top;
          }
          th {
            background-color: #f1f1f1;
          }
          .page-break {
            page-break-before: always;
          }
        `}
      </style>
    </div>
  );
};

export default PrintableReport;
