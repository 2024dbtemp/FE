import React from "react";
import TotalSales from "../components/TotalSales";
import SalesByMember from "../components/SalesByMember";

const Admin = () => {
  return (
    <div>
      <TotalSales />
      <SalesByMember />
    </div>
  );
};

export default Admin;
