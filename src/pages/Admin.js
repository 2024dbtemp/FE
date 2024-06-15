import React from "react";
import TotalSales from "../components/TotalSales";
import SalesPerMember from "./SalesPerMember";

const Admin = () => {
  return (
    <div>
      <TotalSales />
      <SalesPerMember />
    </div>
  );
};

export default Admin;
