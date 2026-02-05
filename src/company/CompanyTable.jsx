import React, { useEffect, useState } from "react";
import "./CompanyTable.css";
import { useNavigate } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import axios from "axios";
import { getCompany } from "../services/auth";

const CompanyTable = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [companyData,setCompanyData] = useState(null)


  useEffect(() => {
    const handleGetData = async () => {
      try {
        const response = await getCompany()
        if (response.status === 200 || response.status === 201) {
          console.log("Success:", response.data);
          setCompanyData(response.data.content)
        }
      } catch (error) {
        if (error.response) {
          console.error("API Error:", error.response.data);
          alert(error.response.data.message || "Submission failed");
        } else {
          console.error("Network Error:", error);
          alert("Server not reachable");
        }
      }
    }
    handleGetData()
  }, [])

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
            {companyData && companyData?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.companyId}</td>
                <td>{item.companyName}</td>
                <td>{item.categoryName}</td>
                <td>{item.employees}</td>
                <td>{item.establishmentDate}</td>
                <td>{item.expiryDate}</td>
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
