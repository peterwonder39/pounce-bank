import React, { useState, useContext } from "react";
import ThemeContext from "../ThemeContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Gauge, CreditCard, TrendingUp, Shield } from "lucide-react";

const AccountLimit = () => {
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();
    const [dailyLimit, setDailyLimit] = useState(50000);
    const [atmLimit, setAtmLimit] = useState(20000);
    const [weeklyLimit, setWeeklyLimit] = useState(250000);

    const handleSave = () => {
        // Optionally, add a smooth success message here instead of alert
    };

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
            
            <motion.button
                onClick={() => navigate("/dashboard")}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    position: "absolute",
                    top: 25,
                    left: 25,
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
                    boxShadow: "0 3px 10px rgba(0,0,0,0.3)",
                    transition: "0.3s",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#019670")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#00b894")}
            >
                <ArrowLeft size={18} /> 
            </motion.button>

            {/* 🏦 Header */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                style={{ textAlign: "center", marginTop: 60 }}
            >
                <Gauge size={60} color="#00b894" />
                <h1 style={{ fontSize: "2.2rem", marginTop: 10 }}>Account Limits</h1>
                <p style={{ color: "#b0c4c4", fontSize: "0.95rem" }}>
                    Manage your daily and weekly transaction limits securely.
                </p>
            </motion.div>

            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                    maxWidth: 700,
                    margin: "40px auto",
                    background: "#243f47",
                    padding: 30,
                    borderRadius: 16,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                    <CreditCard color="#00b894" />
                    <h3 style={{ margin: 0 }}>Daily Transfer Limit</h3>
                </div>
                <input
                    type="range"
                    min="10000"
                    max="200000"
                    step="1000"
                    value={dailyLimit}
                    onChange={(e) => setDailyLimit(e.target.value)}
                    style={{ width: "100%" }}
                />
                <div style={{ textAlign: "right", color: "#00b894", fontWeight: 600 }}>
                    £{Number(dailyLimit).toLocaleString("en-GB")}
                </div>
            </motion.div>

            {/* 🏧 ATM Limit */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{
                    maxWidth: 700,
                    margin: "40px auto",
                    background: "#243f47",
                    padding: 30,
                    borderRadius: 16,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                    <Shield color="#00b894" />
                    <h2 style={{ margin: 0 }}>ATM Withdrawal Limit</h2>
                </div>
                <input
                    type="range"
                    min="5000"
                    max="100000"
                    step="1000"
                    value={atmLimit}
                    onChange={(e) => setAtmLimit(e.target.value)}
                    style={{ width: "100%" }}
                />
                <div style={{ textAlign: "right", color: "#00b894", fontWeight: 600 }}>
                    £{Number(atmLimit).toLocaleString("en-GB")}
                </div>
            </motion.div>

            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                style={{
                    maxWidth: 700,
                    margin: "40px auto",
                    background: "#243f47",
                    padding: 30,
                    borderRadius: 16,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                    <TrendingUp color="#00b894" />
                    <h3 style={{ margin: 0 }}>Weekly Transaction Limit</h3>
                </div>
                <input
                    type="range"
                    min="100000"
                    max="1000000"
                    step="10000"
                    value={weeklyLimit}
                    onChange={(e) => setWeeklyLimit(e.target.value)}
                    style={{ width: "100%" }}
                />
                <div style={{ textAlign: "right", color: "#00b894", fontWeight: 600 }}>
                    £{Number(weeklyLimit).toLocaleString("en-GB")}
                </div>
            </motion.div>

            
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                style={{ textAlign: "center", marginTop: 30 }}
            >
                <button
                    
                    style={{
                        backgroundColor: "#00b894",
                        color: "#fff",
                        border: "none",
                        borderRadius: "30px",
                        padding: "14px 30px",
                        fontSize: "1rem",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "0.3s",
                        boxShadow: "0 3px 10px rgba(0,0,0,0.3)",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#019670")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#00b894")}
                >
                    Save Changes
                </button>
            </motion.div>
        </div>
    );
};

export default AccountLimit;
