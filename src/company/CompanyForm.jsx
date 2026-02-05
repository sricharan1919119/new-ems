import React, { useState } from "react";
import "./CompanyForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createCompany } from "../services/auth";



const CompanyForm = () => {
    const [formData, setFormData] = useState({
        companyName: "",
        establishmentCardNo: "",
        category: "Category_1",
        countryCode: "+971",
        mobileNumber: "",
        city: "",
        establishmentDate: "",
        expiryDate: "",
        trnNumber: "",
        licenseId: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            companyName: formData.companyName,                         // String
            establishmentCardNumber: formData.establishmentCardNo, // String
            phoneNumber: formData.mobileNumber,                         // String
            city: formData.city,                                       // String
            establishmentDate: formData.establishmentDate,             // "YYYY-MM-DD"
            expiryDate: formData.expiryDate,                           // "YYYY-MM-DD"
            trnNumber: formData.trnNumber,                     // Long
            licenseId: formData.licenseId,                             // String
            category: formData.category                                // String
        };

        try {
            const response = await createCompany(payload)

            if (response.status === 200 || response.status === 201) {
                console.log("Success:", response.data);
                navigate("/companies")
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
    };





    return (
        <div className="comp-form-wrapper">
            <form className="comp-form-container" onSubmit={handleSubmit}>

                <div className="comp-form-group">
                    <label className="comp-form-label">
                        Company Name<span>*</span>
                    </label>
                    <input
                        className="comp-form-input"
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        placeholder="companyname"
                        onChange={handleChange}
                    />
                </div>

                <div className="comp-form-group">
                    <label className="comp-form-label">
                        Establishment Card No<span>*</span>
                    </label>
                    <input
                        className="comp-form-input"
                        type="text"
                        name="establishmentCardNo"
                        value={formData.establishmentCardNo}
                        onChange={handleChange}
                        placeholder="establishmentcardno"
                    />
                </div>

                <div className="comp-form-group">
                    <label className="comp-form-label">
                        Category<span>*</span>
                    </label>
                    <select
                        className="comp-form-select"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="Category_1">Category-1</option>
                        <option value="Category_2">Category-2</option>
                    </select>
                </div>

                <div className="comp-form-group">
                    <label className="comp-form-label">
                        Company Registered Mobile Number<span>*</span>
                    </label>
                    <div className="comp-form-mobile">
                        <select
                            className="comp-form-select comp-form-country"
                            name="countryCode"
                            value={formData.countryCode}
                            onChange={handleChange}
                        >
                            <option value="+971">+971</option>
                            <option value="+91">+91</option>
                        </select>
                        <input
                            className="comp-form-input"
                            type="text"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            placeholder="mobile number"
                        />
                    </div>
                </div>

                <div className="comp-form-group">
                    <label className="comp-form-label">
                        City<span>*</span>
                    </label>
                    <input
                        className="comp-form-input"
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="city"
                    />
                </div>

                <div className="comp-form-group">
                    <label className="comp-form-label">
                        Establishment Date<span>*</span>
                    </label>
                    <input
                        className="comp-form-input"
                        type="date"
                        name="establishmentDate"
                        value={formData.establishmentDate}
                        onChange={handleChange}
                        placeholder="establishment date"
                    />
                </div>

                <div className="comp-form-group">
                    <label className="comp-form-label">
                        Expiry Date<span>*</span>
                    </label>
                    <input
                        className="comp-form-input"
                        type="date"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        placeholder="expiry date"
                    />
                </div>

                <div className="comp-form-group">
                    <label className="comp-form-label">
                        TRN Number<span>*</span>
                    </label>
                    <input
                        className="comp-form-input"
                        type="text"
                        name="trnNumber"
                        value={formData.trnNumber}
                        onChange={handleChange}
                        placeholder="trn number"
                    />
                </div>

                <div className="comp-form-group">
                    <label className="comp-form-label">
                        License ID<span>*</span>
                    </label>
                    <input
                        className="comp-form-input"
                        type="text"
                        name="licenseId"
                        value={formData.licenseId}
                        onChange={handleChange}
                        placeholder="license id"
                    />
                </div>

                <div className="comp-form-actions">
                    <button
                        type="button"
                        className="comp-form-btn comp-form-cancel"
                        onClick={()=>navigate("/companies")}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="comp-form-btn comp-form-save"
                    >
                        Save
                    </button>
                </div>

            </form>
        </div>
    );
};

export default CompanyForm;
