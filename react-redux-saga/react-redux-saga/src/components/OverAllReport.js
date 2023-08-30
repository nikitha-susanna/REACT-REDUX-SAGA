import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line
} from "recharts";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { getCurrentDate } from "../functions/commonFunctions";

function OverAllReport({ open, close, userData }) {
  const [monthlySales, setMonthlySales] = useState([]);
  const [showBarGraph, setShowBarGraph] = useState(false);

  useEffect(
    () => {
      const newMonthlySales = [];
      const monthlySalesData = {};
      userData.forEach(user => {
        user.salesStat.forEach(sale => {
          const { month, sales } = sale;
          monthlySalesData[month] = (monthlySalesData[month] || 0) + sales;
        });
      });
      Object.keys(monthlySalesData).forEach(month => {
        newMonthlySales.push({ month: month, sales: monthlySalesData[month] });
      });
      setMonthlySales(newMonthlySales);
    },
    [userData]
  );

  function downloadReportById(elementId) {
   const element = document.getElementById(elementId);
   if (!element) {
     console.error("Element not found!");
     return;
   }
 
   html2canvas(element, { useCORS: true }).then(function (canvas) {
     const imgData = canvas.toDataURL("image/jpeg", 1.0);
     const pdf = new jsPDF();
     const tableColumns = ["Month", "Sales"];
     const tableData = monthlySales.map((sales) => [sales.month, sales.sales]);
     const pdfWidth = pdf.internal.pageSize.getWidth();
     const imageWidth = 100;
     const imageHeight = (canvas.height * imageWidth) / canvas.width;
     const x = (pdfWidth - imageWidth) / 2;
     //Adding the headding the the PDF
     const heading = "Report for the last 4 months";
     pdf.text(heading, 10, 10);
     pdf.setFontSize(10)
     const text = "Note: The reports are only displayed for the four months preceding them by default; there is no other option to view the information for the other"
     const splitText = pdf.splitTextToSize(text, 190);
     pdf.text(splitText, 10, 20);
     const tableY = 30; 
     pdf.autoTable({
       head: [tableColumns],
       body: tableData,
       theme: "grid",
       startY: tableY,
     });
     const graphY = pdf.autoTable.previous.finalY + 10; 
     pdf.addImage(imgData, "JPEG", x, graphY, imageWidth, imageHeight);
     pdf.save(`over_all_report ${getCurrentDate()}_report.pdf`);
   });
 }
   

  return (
    <div>
    <div id="canvas" ></div>
      <Dialog open={open} onClose={close}>
        <DialogTitle>
          Over All Report
          {showBarGraph
            ? <IconButton
                onClick={() => {
                  setShowBarGraph(!showBarGraph);
                }}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: theme => theme.palette.grey[500]
                }}
              >
                <BarChartIcon />
              </IconButton>
            : <IconButton
                onClick={() => {
                  setShowBarGraph(!showBarGraph);
                }}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: theme => theme.palette.grey[500]
                }}
              >
                <ShowChartIcon />
              </IconButton>}
        </DialogTitle>
        {!showBarGraph
          ? <DialogContent id="barGraph">
              <BarChart width={500} height={400} data={monthlySales} >
                <XAxis dataKey="month" stroke="#2e7d32" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="sales" fill="#2e7d32" barSize={45} />
              </BarChart>
            </DialogContent>
          : <DialogContent id="lineGraph">
              <LineChart width={500} height={400} data={monthlySales} >
                <Line type="monotone" dataKey="sales" stroke="#2e7d32" strokeWidth={3}/>
                <CartesianGrid stroke="#ccc" strokeDasharray="7 7" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </DialogContent>}
        <DialogActions>
          <Button variant="outlined" color="success" size="large" onClick={() => downloadReportById(showBarGraph ? "lineGraph" : "barGraph")}>
            Download report
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default OverAllReport;
