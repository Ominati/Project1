import { useState, useEffect } from "react";

function OTPVerification({ email, onVerifySuccess, onBackToLogin }) {
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [otpSent, setOtpSent] = useState(false);

  // Generate OTP when component mounts
  useEffect(() => {
    generateAndSendOtp();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      setError("OTP expired. Please request a new one.");
      return;
    }

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Generate random 6-digit OTP
  const generateAndSendOtp = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    setOtpSent(true);
    setError("");
    setOtp("");
    setTimeLeft(300);

    // Simulate sending OTP to email (in real scenario, this would call a backend API)
    console.log(`OTP sent to ${email}: ${newOtp}`);
    alert(`OTP has been sent to ${email}\nFor testing: ${newOtp}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!otp) {
      setError("Please enter the OTP");
      return;
    }

    if (otp === generatedOtp) {
      setSuccess("OTP verified successfully!");
      setError("");
      setTimeout(() => {
        onVerifySuccess();
      }, 1500);
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2>OTP Verification</h2>
      <p style={{ fontSize: "0.9em", color: "#646cff" }}>
        Verification code has been sent to <strong>{email}</strong>
      </p>

      <form onSubmit={handleSubmit}>
        <label>Enter OTP</label>
        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value.slice(0, 6))}
          maxLength="6"
          required
        />

        <p
          style={{
            textAlign: "center",
            fontSize: "0.9em",
            color: timeLeft < 60 ? "#cb0404" : "#646cff",
            marginTop: "10px"
          }}
        >
          Time remaining: <strong>{formatTime(timeLeft)}</strong>
        </p>

        <button type="submit" style={{ width: "100%", marginTop: "10px" }}>
          Verify OTP
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: "20px", fontSize: "0.9em" }}>
        Didn't receive the code?{' '}
        <button
          onClick={generateAndSendOtp}
          style={{
            background: "none",
            border: "none",
            color: "#646cff",
            cursor: "pointer",
            textDecoration: "underline",
            fontSize: "0.9em"
          }}
        >
          Resend OTP
        </button>
      </p>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      {success && <p style={{ color: "green", marginTop: "10px" }}>{success}</p>}

      <p style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={onBackToLogin}
          style={{
            background: "none",
            border: "none",
            color: "#646cff",
            cursor: "pointer",
            textDecoration: "underline",
            fontSize: "0.9em"
          }}
        >
          Back to Login
        </button>
      </p>
    </div>
  );
}

export default OTPVerification;
