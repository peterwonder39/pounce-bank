// src/pages/PayBill.jsx
import React, { useState, useContext } from "react";
import ThemeContext from "../ThemeContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
    Phone,
    Wifi,
    Zap,
    Gamepad2,
    Tv,
    Droplets,
    CreditCard,
    ArrowLeft,
} from "lucide-react";

const PayBill = () => {
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const categories = [
        { title: "Airtime", icon: <Phone size={26} />, color: "#00b894" },
        { title: "Data", icon: <Wifi size={26} />, color: "#00b894" },
        { title: "Electricity", icon: <Zap size={26} />, color: "#00b894" },
        { title: "Betting", icon: <Gamepad2 size={26} />, color: "#00b894" },
        { title: "Cable TV", icon: <Tv size={26} />, color: "#00b894" },
        { title: "Water", icon: <Droplets size={26} />, color: "#00b894" },
        { title: "Internet", icon: <Wifi size={26} />, color: "#00b894" },
        { title: "Others", icon: <CreditCard size={26} />, color: "#00b894" },
    ];

    const [comingSoon, setComingSoon] = useState("");
    // Handler for category click
    const handleCategoryClick = (title) => {
        setComingSoon(`${title} - Coming Soon!`);
        setTimeout(() => setComingSoon(""), 2000);
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: theme === 'dark' ? "linear-gradient(135deg, #0f2027, #203a43, #2c5364)" : "linear-gradient(135deg, #dfe9f3, #ffffff)",
                color: theme === 'dark' ? "#fff" : "#111",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "40px 20px",
            }}
        >
            {/* Back Button */}
            <button
                onClick={() => navigate("/dashboard")}
                style={{
                    alignSelf: "flex-start",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "transparent",
                    border: "1px solid #00b894",
                    color: "#00b894",
                    borderRadius: "30px",
                    padding: "6px 14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "0.3s",
                    fontSize: "0.9rem",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#00b89420")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
            >
                <ArrowLeft size={14} /> 
            </button>

            {/* Header */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                    fontSize: "clamp(1.6rem, 4vw, 2.3rem)",
                    marginTop: "20px",
                    textAlign: "center",
                    fontWeight: "700",
                }}
            >
                Pay Your Bills Instantly 
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                style={{
                    color: "#ccc",
                    textAlign: "center",
                    maxWidth: "600px",
                    marginTop: "8px",
                    fontSize: "0.95rem",
                }}
            >
                Select a service category below to make quick and secure payments.
            </motion.p>


            {/* Smooth Coming Soon Message */}
            {comingSoon && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    style={{
                        background: "#00b894",
                        color: "#fff",
                        padding: "12px 28px",
                        borderRadius: "8px",
                        margin: "18px auto 0 auto",
                        fontWeight: 600,
                        fontSize: "1.05rem",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                        textAlign: "center",
                        maxWidth: "350px",
                        zIndex: 10,
                    }}
                >
                    {comingSoon}
                </motion.div>
            )}

            {/* Bill Categories */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="bill-grid"
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                    gap: "18px",
                    width: "100%",
                    maxWidth: "800px",
                    marginTop: "40px",
                }}
            >
                {categories.map((item, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.05, y: -4 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 250 }}
                        style={{
                            background: "#1e2d34",
                            borderRadius: "14px",
                            padding: "20px 10px",
                            textAlign: "center",
                            cursor: "pointer",
                            boxShadow: "0 3px 6px rgba(0, 0, 0, 0.25)",
                            border: "1px solid rgba(255,255,255,0.05)",
                            transition: "all 0.3s ease",
                        }}
                        onClick={() => handleCategoryClick(item.title)}
                    >
                        <div
                            style={{
                                color: item.color,
                                display: "flex",
                                justifyContent: "center",
                                marginBottom: "8px",
                            }}
                        >
                            {item.icon}
                        </div>
                        <div
                            style={{
                                fontSize: "0.95rem",
                                fontWeight: "600",
                                color: "#fff",
                                letterSpacing: "0.3px",
                            }}
                        >
                            {item.title}
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Footer */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                style={{
                    marginTop: "50px",
                    color: "#aaa",
                    fontSize: "0.85rem",
                    textAlign: "center",
                }}
            >
                💳 Fast, secure, and reliable payments powered by{" "}
                <span style={{ color: "#00b894", fontWeight: "600" }}>Pounce Bank</span>
            </motion.div>
        </div>
    );
};

export default PayBill;
