import React, { useState, useContext } from "react";
import ThemeContext from "../ThemeContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import img from "../assets/newpounce-removebg-preview.png";
import Loader from "../pages/Loader"


const Signin = () => {
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);





    const loginUser = () => {
        setError("");
        setSuccess("");
        setLoading(true);
        const oldUser = { email, password };

        axios
            .post("https://backend-pounce.onrender.com/user/signin", oldUser)
            .then((res) => {

                if (res.data.message === "Login successful") {
                    // ✅ Save JWT token
                    localStorage.setItem("token", res.data.token);

                    // ✅ Save full user object including _id
                    localStorage.setItem("user", JSON.stringify(res.data.user));

                    setSuccess("Welcome back! Redirecting to dashboard...");
                    setTimeout(() => navigate("/dashboard"), 3000);
                } else {
                    setError(res.data.message || "Invalid credentials");
                }
            })
            .catch((err) => {
                console.error("Login Error:", err.response ? err.response.data : err);
                setError("Login failed. Please check your email or password.");
            })
            .finally(() => {
                setLoading(false);
            });
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

    const spin = {
        animation: "spin 2s linear infinite",
    };

    const keyframes = `
    @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
`;

    // inject keyframes once (so you don’t need external CSS)
    if (!document.getElementById("spin-keyframes")) {
        const style = document.createElement("style");
        style.id = "spin-keyframes";
        style.innerHTML = keyframes;
        document.head.appendChild(style);
    }


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
                <h1 style={{ marginBottom: "20px", color: "#00b894" }}>Sign In</h1>

                <form
                    onSubmit={(e) => {
                        e.preventDefault(); // prevent page reload
                        loginUser(); // call your login function
                    }}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                >
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
                        <p style={{ color: "red", marginBottom: "10px", fontSize: "0.9rem" }}>{error}</p>
                    )}
                    {success && (
                        <p style={{ color: "#00b894", marginBottom: "10px", fontSize: "0.95rem", fontWeight: 600 }}>{success}</p>
                    )}
                    <button type="submit" style={buttonStyle} disabled={loading}>
                        {loading ? (
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                                <Loader size={16} color="#0000" />
                                <span>Signing In...</span>
                            </div>
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>

                <p style={{ marginTop: "15px" }}>
                    Don’t have an account?{" "}
                    <span
                        style={{ color: "#00b894", cursor: "pointer" }}
                        onClick={() => navigate("/signup")}
                    >
                        Sign Up
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Signin;
