import React, { useRef, useState } from "react";
import Logo from "./assets/Screenshot.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function OtpVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const { email } = useParams();


  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      return setErrorMsg("Please enter a valid 6-digit OTP");
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "/api/auth/verify-otp",
        {
          email,
          otp: enteredOtp,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "OTP verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-row">
      <div className="login-brand">
        <div className="login-brand-content">
          <img src={Logo} width={200} style={{ borderRadius: "10px" }} />
          <h1 className="login-title">EMS</h1>
          <p className="login-subtitle">Employee Management System</p>
          <div className="login-divider"></div>
          <p className="login-description">
            Streamline your workforce management with our comprehensive solution.
          </p>
        </div>
      </div>

      <div className="otp-verification">
        <form onSubmit={handleSubmit} className="otp-form">
          <h2>OTP Verification</h2>
          <p className="otp-message">
            Enter the OTP sent to <strong>{email}</strong>
          </p>

          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputsRef.current[index] = el)}
                className="otp-input"
                autoFocus={index === 0}
              />
            ))}
          </div>

          {errorMsg && <p className="text-danger mt-2">{errorMsg}</p>}

          <button
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
