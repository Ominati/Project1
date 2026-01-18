import { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (onLogin(email, password)) {
      setError("");
      setSuccess("✓ Login successful!");
    } else {
      setError("Invalid email or password");
      setSuccess("");
    }
  };

    return (
        <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" style={{ width: "100%" }}>
            {success ? "✓ " : ""}Login
          </button>
          </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green", textAlign: "center", fontSize: "1.2em" }}>{success}</p>}
            </div>
    );
}

export default Login;