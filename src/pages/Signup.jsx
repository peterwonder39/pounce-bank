import React, { useState, useContext } from "react";
import ThemeContext from "../ThemeContext";
import { useNavigate } from "react-router-dom";
import img from "../assets/newpounce-removebg-preview.png";
import axios from "axios";
import Loader from "../pages/Loader"

const Signup = () => {
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");

    const addUser = (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        const newUser = { fullName: `${firstName} ${lastName}`, email, password };

        axios.post("https://backend-pounce.onrender.com/user/signup", newUser)
            .then((res) => {
                if ((res.status === 201 || res.status === 200) && res.data.user) {
                    // Save user object (including _id) to localStorage
                    localStorage.setItem("user", JSON.stringify(res.data.user));
                    setSuccess("Signup successful!");
                    setTimeout(() => navigate("/signin"), 2000);
                } else if (res.status === 201 || res.status === 200) {
                    setSuccess("Signup successful! Please login.");
                    setTimeout(() => navigate("/signin"), 2000);
                } else {
                    setError("Unexpected response from server.");
                }
            })
            .catch((err) => {
                console.error("Error:", err.response ? err.response.data : err);
                setError(err.response?.data?.message || "Signup failed. Try again.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: theme === 'dark' ? "linear-gradient(135deg, #2c3e50, #4ca1af)" : "linear-gradient(135deg, #dfe9f3, #ffffff)",
                color: theme === 'dark' ? "white" : "#111",
                padding: "20px",
            }}
        >
            <div
                style={{
                    background: "rgba(0, 0, 0, 0.6)",
                    padding: "40px",
                    borderRadius: "15px",
                    maxWidth: "400px",
                    width: "100%",
                    textAlign: "center",
                }}
            >
                <img
                    src={img}
                    alt="Logo"
                    style={{ width: "120px", marginBottom: "15px" }}
                />
                <h1 style={{ marginBottom: "20px", color: "#00b894" }}>Sign Up</h1>

                <form
                    onSubmit={addUser}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                >
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        style={inputStyle}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        style={inputStyle}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={inputStyle}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={inputStyle}
                        required
                    />


                    {error && (
                        <p style={{ color: "red", marginBottom: "10px", fontSize: "0.9rem" }}>
                            {error}
                        </p>
                    )}
                    {success && (
                        <p style={{ color: "#00b894", marginBottom: "10px", fontSize: "0.95rem", fontWeight: 600 }}>
                            {success}
                        </p>
                    )}

                    <button type="submit" style={buttonStyle} disabled={loading}>
                        {loading ? (
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                                <Loader size={16} color="#0000" />
                                <span>Signing up...</span>
                            </div>
                        ) : (
                            "Sign up"
                        )}
                    </button>
                </form>

                <p style={{ marginTop: "15px" }}>
                    Already have an account?{" "}
                    <span
                        style={{ color: "#00b894", cursor: "pointer" }}
                        onClick={() => navigate("/signin")}
                    >
                        Sign In
                    </span>
                </p>
            </div>
        </div>
    );
};

const inputStyle = {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    fontSize: "1rem",
};

const buttonStyle = {
    backgroundColor: "#00b894",
    color: "#fff",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    width: "100%",
    marginTop: "10px",
};

export default Signup;
