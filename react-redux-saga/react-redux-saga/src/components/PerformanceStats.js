import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

function PerformanceStats({ openReport, closeReport, data, userName }) {
  return (
    <div>
      <Dialog open={openReport} onClose={closeReport}>
        <DialogTitle align="left">
          {`${userName}'s sales report for the preceding 4 months `}
        </DialogTitle>
        <DialogContent>
          <LineChart width={500} height={400} data={data}>
            <Line type="monotone" dataKey="sales" stroke="#1976d2" strokeWidth={3}/>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PerformanceStats;
