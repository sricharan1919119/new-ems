import React, { useState } from "react";
import "./CompanyTable.css";
import { useNavigate } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";

const CompanyTable = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const data = Array.from({ length: 7 }).map((_, i) => ({
    id: i + 1,
    companyId: "xvdad",
    companyName: "1254865565",
    category: "2",
    employees: "55",
    established: "",
    expiry: "",
  }));

  return (
    <div className="comp-container">
      {/* Header */}
      <div className="comp-table-header">
        <input
          type="text"
          placeholder="Search"
          className="comp-search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="comp-header-right"  onClick={()=>navigate("/company-form")}>
          <span className="comp-total-count">
            <IoMdAddCircle size={25} className="p-1"/>
           <span>Add Company</span>
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="comp-table-wrapper">
        <table className="comp-table">
          <thead>
            <tr>
              <th>S. No</th>
              <th>Company ID</th>
              <th>Company Name</th>
              <th>Category</th>
              <th>No of employees</th>
              <th>Date of Establishment</th>
              <th>Date of Expiry</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.companyId}</td>
                <td>{item.companyName}</td>
                <td>{item.category}</td>
                <td>{item.employees}</td>
                <td>{item.established}</td>
                <td>{item.expiry}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="comp-pagination">
        <span>{"<<"}</span>
        <span className="comp-active">1</span>
        <span>2</span>
        <span>3</span>
        <span>...</span>
        <span>{">>"}</span>
      </div>
    </div>
  );
};

export default CompanyTable;
