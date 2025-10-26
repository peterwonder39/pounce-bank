import React, { useState, useContext } from "react";
import ThemeContext from "../ThemeContext";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Smartphone, Eye, EyeOff, Activity, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SecurityCenter = () => {
    const { theme } = useContext(ThemeContext);
    const [showPassword, setShowPassword] = useState(false);
    const [twoFactor, setTwoFactor] = useState(false);
    const navigate = useNavigate();

    return (
        <div
            style={{
                minHeight: "100vh",
                background: theme === 'dark' ? "#1d353d" : "#dfe9f3",
                color: theme === 'dark' ? "#fff" : "#111",
                padding: "40px 20px",
                position: "relative",
            }}
        >
            


            
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                style={{
                    maxWidth: "700px",
                    margin: "0 auto",
                    textAlign: "center",
                    marginTop: "60px",
                }}
            >
                <ShieldCheck size={60} color="#00b894" />
                <h1 style={{ fontSize: "2.2rem", marginTop: 10 }}>Security Center</h1>
                <p style={{ color: "#b0c4c4" }}>
                    Manage your account’s safety and privacy from one place.
                </p>
            </motion.div>

            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                    background: "#243f47",
                    borderRadius: "16px",
                    padding: "25px",
                    margin: "40px auto",
                    maxWidth: "700px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                }}
            >
                <h4 style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
                    <Lock /> Change Password
                </h4>

                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Old Password"
                        style={{
                            padding: "12px",
                            borderRadius: "10px",
                            border: "none",
                            outline: "none",
                            background: "#1a2f35",
                            color: "#fff",
                        }}
                    />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="New Password"
                        style={{
                            padding: "12px",
                            borderRadius: "10px",
                            border: "none",
                            outline: "none",
                            background: "#1a2f35",
                            color: "#fff",
                        }}
                    />
                    <button

                        style={{
                            background: "transparent",
                            border: "none",
                            color: "#00b894",
                            alignSelf: "flex-end",
                            cursor: "pointer",
                            fontSize: "0.9rem",
                        }}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}{" "}
                        {showPassword ? "Hide Password" : "Show Password"}
                    </button>

                    <button
                        style={{
                            backgroundColor: "#00b894",
                            color: "#fff",
                            padding: "12px",
                            borderRadius: "10px",
                            border: "none",
                            cursor: "pointer",
                            fontWeight: "400",
                            transition: "0.3s",
                        }}
                        onMouseOver={(e) => (e.target.style.backgroundColor = "#019670")}
                        onMouseOut={(e) => (e.target.style.backgroundColor = "#00b894")}
                    >
                        Update Password
                    </button>
                </div>
            </motion.div>

            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{
                    background: "#243f47",
                    borderRadius: "16px",
                    padding: "25px",
                    margin: "40px auto",
                    maxWidth: "700px",
                }}
            >
                <h4 style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
                    <Smartphone /> Two-Factor Authentication (2FA)
                </h4>
                <p style={{ color: "#b0c4c4", fontSize: "0.9rem" }}>
                    Add an extra layer of security to your account.
                </p>
                <button

                    style={{
                        marginTop: 15,
                        backgroundColor: twoFactor ? "#00b894" : "#1a2f35",
                        color: "#fff",
                        padding: "12px 25px",
                        borderRadius: "30px",
                        border: "none",
                        cursor: "pointer",
                        fontWeight: "600",
                        transition: "0.3s",
                    }}
                >
                    {twoFactor ? "Disable 2FA" : "Enable 2FA"}
                </button>
            </motion.div>

            {/* 🧭 Recent Login Activity */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                style={{
                    background: "#243f47",
                    borderRadius: "16px",
                    padding: "25px",
                    margin: "40px auto",
                    maxWidth: "700px",
                }}
            >
                <h4 style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
                    <Activity /> Recent Login Activity
                </h4>
                <ul
                    style={{
                        textAlign: "left",
                        color: "#b0c4c4",
                        fontSize: "0.9rem",
                        listStyle: "none",
                        padding: 0,
                    }}
                >

                </ul>
            </motion.div>

            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                style={{
                    background: "#1a2f35",
                    borderRadius: "16px",
                    padding: "25px",
                    margin: "40px auto",
                    maxWidth: "700px",
                    textAlign: "center",
                    color: "#b0c4c4",
                }}
            >
                <p>
                     <strong>Security Tip:</strong> Never share your PIN or password with anyone —
                    even if they claim to be from Pounce Bank.
                </p>
            </motion.div>

            <motion.button
                onClick={() => navigate("/dashboard")}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    // position: "absolute",
                    backgroundColor: "#00b894",
                    color: "#fff",
                    border: "none",
                    borderRadius: "30px",
                    padding: "10px 18px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontWeight: "600",
                    cursor: "pointer",
                    boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
                    transition: "0.3s",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#019670")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#00b894")}
            >
                <ArrowLeft size={18} /> 
            </motion.button>
        </div>
    );
};

export default SecurityCenter;
