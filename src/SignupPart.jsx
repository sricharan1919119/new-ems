// SignupPart.jsx
import React, { useState } from 'react';
import Logo from './assets/Screenshot.png';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const SignupPart = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    country: '',
    zipCode: '',
    mobileNumber: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    setErrors(prev => ({
      ...prev,
      [name]: ""
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setResponseMsg("");
    setErrorMsg("");
    setLoading(true);

    let newErrors = {};

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.zipCode) newErrors.zipCode = "Zip Code is required";
    if (!formData.mobileNumber) newErrors.mobileNumber = "Mobile number is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      gender: formData.gender.toUpperCase(),
      country: formData.country,
      zipcode: formData.zipCode,
      mobileNumber: formData.mobileNumber,
      password: formData.password
    };

    try {
      const response = await axios.post(
        "/api/auth/register",
        payload,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (response.status === 200) {
        setResponseMsg(response.data.message || "Signup successful");
         navigate(`/otpverification/${formData.email}`);
      }
    } catch (error) {
      if (error.response) {
        setErrorMsg(error.response.data?.message || "Request failed");
      } else {
        setErrorMsg("Server not reachable");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='d-flex flex-row'>
      <div className="login-brand">
        <div className="login-brand-content">
          <img src={Logo} width={200} style={{ borderRadius: "10px" }} />
          <h1 className="login-title">EMS</h1>
          <p className="login-subtitle">Employee Management System</p>
          <div className="login-divider"></div>
          <p className="login-description">
            Streamline your workforce management with our comprehensive employee
            tracking and management solution.
          </p>
        </div>
      </div>

      <div className="login-form-wrapper">
        <form className="login-form">
          <div className="login-header">
            <h2 className="login-welcome">Create Account</h2>
          </div>

          <div className="form-row col-lg-12 row">
            <div className="form-group col-lg-6">
              <label className="login-label">First Name</label>
              <input
                className="login-input"
                type="text"
                name="firstName"
                value={formData.firstName}
                placeholder='firstname'
                onChange={handleChange}
              />
              {errors.firstName && <p className="text-danger mt-1">{errors.firstName}</p>}
            </div>

            <div className="form-group col-lg-6">
              <label className="login-label">Last Name</label>
              <input
                className="login-input"
                type="text"
                name="lastName"
                placeholder='"lastname'
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <p className="text-danger mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div className="form-row col-lg-12 row">
            <div className="form-group col-lg-6">
              <label className="login-label">Email</label>
              <input
                className="login-input"
                type="email"
                name="email"
                value={formData.email}
                placeholder='email'
                onChange={handleChange}
              />
              {errors.email && <p className="text-danger mt-1">{errors.email}</p>}
            </div>

            <div className="form-group col-lg-6">
              <label className="login-label">Gender</label>
              <select
                className="login-input"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <p className="text-danger mt-1">{errors.gender}</p>}
            </div>
          </div>

          <div className="form-row col-lg-12 row">
            <div className="form-group col-lg-6">
              <label className="login-label">Country</label>
              <input
                className="login-input"
                type="text"
                name="country"
                value={formData.country}
                placeholder='country'
                onChange={handleChange}
              />
              {errors.country && <p className="text-danger mt-1">{errors.country}</p>}
            </div>

            <div className="form-group col-lg-6">
              <label className="login-label">Zip Code</label>
              <input
                className="login-input"
                type="text"
                name="zipCode"
                value={formData.zipCode}
                placeholder='zipcode'
                onChange={handleChange}
              />
              {errors.zipCode && <p className="text-danger mt-1">{errors.zipCode}</p>}
            </div>
          </div>

          <div className="form-row col-lg-12 row">
            <div className="form-group col-lg-6">
              <label className="login-label">Mobile Number</label>
              <input
                className="login-input"
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                placeholder='mobile'
                onChange={handleChange}
              />
              {errors.mobileNumber && <p className="text-danger mt-1">{errors.mobileNumber}</p>}
            </div>
          </div>

          <div className="form-row col-lg-12 row">
            <div className="form-group col-lg-6">
              <label className="login-label">Password</label>
              <input
                className="login-input"
                type="password"
                name="password"
                value={formData.password}
                placeholder='password'
                onChange={handleChange}
              />
              {errors.password && <p className="text-danger mt-1">{errors.password}</p>}
            </div>

            <div className="form-group col-lg-6">
              <label className="login-label">Confirm your Password</label>
              <input
                className="login-input"
                type="password"
                name="confirmPassword"
                placeholder='confirmpassword'
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="text-danger mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          {errorMsg && <p className="text-danger mt-2">{errorMsg}</p>}
          {responseMsg && <p className="text-success mt-2">{responseMsg}</p>}

          <div className="form-footer">
            <p className="terms-text">
              By creating an account, you agree to our Terms of Service and acknowledge that you have read our Privacy Policy.
            </p>

            <button
              type="submit"
              className="login-button"
              onClick={handleSubmit}
              disabled={loading}
              style={{
                width: '100%',
                backgroundColor: '#667eea',
                color: 'white',
                padding: '16px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#5a67d8'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#667eea'}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            <p className="login-footer">
              © 2025 Employee Management System. All rights reserved.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPart;
