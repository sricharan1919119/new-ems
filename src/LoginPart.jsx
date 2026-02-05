import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./assets/Screenshot.png";
import { loginUser } from "./services/auth";

const LoginPart = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrorMsg("");
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      return setErrorMsg("Please enter email and password");
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const response = await loginUser(formData.email,formData.password)
      if (response.status === 200) {
        console.log("Login successful");
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      }
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "Invalid credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-row">
      {/* LEFT BRAND SECTION */}
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

      {/* RIGHT LOGIN FORM */}
      <div className="login-form-wrapper">
        <div className="login-form">
          <p className="login-welcome m-0">Hi, Welcome!</p>
           <div className="login-register-box" onClick={()=>navigate('/signup')}>
            <p>
              If you don't have an account,{" "}
              <a href="#" className="login-register-link">
                You can Register as a Supplier here!
              </a>
            </p>
          </div>
          <div className="login-field">
            <label className="login-label">Email</label>
            <input
              className="login-input"
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="login-field">
            <label className="login-label">Password</label>
            <input
              className="login-input"
              type="password"
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>

          {errorMsg && (
            <p className="text-danger mt-2">{errorMsg}</p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              width: "100%",
              backgroundColor: "#667eea",
              color: "white",
              padding: "16px",
              borderRadius: "8px",
              border: "none",
              fontSize: "16px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          <div className="login-footer">
            © 2025 Employee Management System. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPart;
