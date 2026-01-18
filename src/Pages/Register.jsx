import { useState } from "react";

function Register({ onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Function to check if account already exists
  const isAccountRegistered = (checkEmail, checkName) => {
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    return registeredUsers.some(
      (user) => user.email === checkEmail || user.name === checkName
    );
  };

  // Function to get registered user by email
  const getUserByEmail = (checkEmail) => {
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    return registeredUsers.find((user) => user.email === checkEmail);
  };

  // Function to get registered user by name
  const getUserByName = (checkName) => {
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    return registeredUsers.find((user) => user.name === checkName);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if account already exists
    if (isAccountRegistered(email, name)) {
      const existingEmail = getUserByEmail(email);
      const existingName = getUserByName(name);
      
      if (existingEmail && existingName) {
        setError("An account with this name and email already exists");
      } else if (existingEmail) {
        setError("An account with this email already exists");
      } else if (existingName) {
        setError("An account with this name already exists");
      }
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (password.length < 5) {
      setError("Password must be at least 5 characters");
      return;
    }
    
    // Save user to localStorage
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    registeredUsers.push({ name, email, password });
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
    
    setSuccess("✓ Registration successful! You can now login.");
    setError("");
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    
    setTimeout(() => {
      onRegister();
    }, 2000);
  };

  return (
    <div className="form-container">
      <h2>Registration</h2>
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Register</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}

export default Register;
