import React, { useEffect, useState } from "react";
// Format as GBP
const formatCurrency = (n) => {
    if (!n && n !== 0) return "";
    return Number(n).toLocaleString("en-GB", { style: "currency", currency: "GBP" });
};
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const Success = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { message, newBalance } = location.state || {};
    // Try to get from state, then from sessionStorage if missing
    const [amount, setAmount] = useState(location.state?.amount || "");
    const [recipientAccount, setRecipientAccount] = useState(location.state?.recipientAccount || "");
    const [recipientName, setRecipientName] = useState(location.state?.recipientName || "");

    // On mount, if amount or recipientAccount missing, try to get from sessionStorage
    useEffect(() => {
        if (!amount) {
            const storedAmount = sessionStorage.getItem("lastTransferAmount");
            if (storedAmount) setAmount(storedAmount);
        } else {
            sessionStorage.setItem("lastTransferAmount", amount);
        }
        if (!recipientAccount) {
            const storedAcc = sessionStorage.getItem("lastTransferRecipientAccount");
            if (storedAcc) setRecipientAccount(storedAcc);
        } else {
            sessionStorage.setItem("lastTransferRecipientAccount", recipientAccount);
        }
    }, [amount, recipientAccount]);

    useEffect(() => {
        // If recipientName is missing but we have recipientAccount, fetch it
        if (!recipientName && recipientAccount) {
            fetch(`http://localhost:5000/user/recipient/${recipientAccount}`)
                .then(res => res.json())
                .then(data => {
                    if (data.fullName) setRecipientName(data.fullName.toUpperCase());
                })
                .catch(() => setRecipientName("Account not found"));
        }
    }, [recipientName, recipientAccount]);

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#1d353d",
                color: "white",
                fontFamily: "Inter, sans-serif",
                padding: "20px",
            }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: "16px",
                    padding: "40px 30px",
                    textAlign: "center",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                    width: "90%",
                    maxWidth: "400px",
                    height:"90vh"
                }}
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                    <CheckCircle size={90} color="#00b894" />
                </motion.div>

                <h1 style={{ fontSize: "1.8rem", marginTop: "20px", color: "#00b894" }}>
                    Transaction Successful
                </h1>

                <p style={{ marginTop: "10px", color: "#d3d3d3" }}>
                    {message || "Your transfer was completed successfully!"}
                </p>

                <div
                    style={{
                        background: "rgba(255,255,255,0.08)",
                        borderRadius: "12px",
                        padding: "15px 20px",
                        marginTop: "25px",
                        textAlign: "left",
                        fontSize: "0.95rem",
                        color: "#cfe9e4",
                    }}
                >
                    <p>
                        <strong>Amount Sent:</strong> {formatCurrency(amount)}
                    </p>
                    <p>
                        <strong>Recipient Account:</strong> {recipientAccount}
                    </p>
                    <p>
                        <strong>Recipient Name:</strong> {recipientName?.toLocaleString()}
                    </p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        marginTop: "30px",
                        background: "#00b894",
                        color: "#1d353d",
                        border: "none",
                        borderRadius: "8px",
                        padding: "12px 25px",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        cursor: "pointer",
                    }}
                    onClick={() => navigate("/dashboard")}
                >
                    Back to Dashboard
                </motion.button>
            </motion.div>
        </div>
    );
};

export default Success;
