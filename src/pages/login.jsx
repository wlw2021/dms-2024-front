import React, { useState } from "react";
import  { useLocation, useNavigate }  from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Login successful! CID: ${data.CID}`);
        setTimeout(() => {
          navigate('/choose', { state: { CID : data.CID } })
        }, 1000);
      } else {
        const errorData = await response.json();
        setMessage(`Login failed: ${errorData.error}`);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
      console.error("Error during login request:", error);
    }
  };

  return (
    <div style={{ width: "300px", margin: "0 auto", padding: "20px", textAlign: "center", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>User Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: "90%", padding: "8px", margin: "5px 0", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "90%", padding: "8px", margin: "5px 0", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>
        <button
          type="submit"
          style={{ width: "100%", padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Login
        </button>
      </form>
      {message && (
        <div style={{ marginTop: "15px", color: message.includes("successful") ? "green" : "red" }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default LoginForm;
