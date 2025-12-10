import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Icons
import {
    DollarSign,
    Send,
    CreditCard,
    Wallet,
    Landmark,
    Building,
    Banknote,
    ArrowLeft
} from "lucide-react";

export default function Withdraw() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null);

    const options = [
        { name: "CashApp", icon: DollarSign },
        { name: "PayPal", icon: Send },
        { name: "Chase Bank", icon: Landmark },
        { name: "Monzo", icon: Wallet },
        { name: "Venmo", icon: Building },
        { name: "Revolut", icon: CreditCard },
    ];

    return (
        <div
            className="min-vh-100  flex-column align-items-center p-5"
            style={{
                background: "linear-gradient(135deg,#0f2027, #203a43, #2c5364)",
            }}
        >
            {/* Title */}
            <motion.h2
                className="fw-bold text-white mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Withdraw Funds
            </motion.h2>

            {/* Withdrawal Options */}
            <motion.div
                className="d-flex flex-column gap-3 w-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                {options.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div key={index}>
                            <motion.button
                                className="btn text-white py-3 fw-semibold d-flex align-items-center justify-content-between px-4 shadow-sm"
                                style={{
                                    background: "#00b894",
                                    borderRadius: "14px",
                                    fontSize: "17px",
                                }}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setSelected(index)}
                            >
                                <span>{item.name}</span>
                                <Icon size={22} />
                            </motion.button>
                            {selected === index && (
                                <div style={{ marginTop: 8, color: '#fff', background: 'rgba(0,0,0,0.15)', borderRadius: 8, padding: '10px 16px', fontWeight: 500, fontSize: 15 }}>
                                    A minimum of $200 deposit is required in your account to activate and  enable withdrawal. Kindly deposit now!
                                </div>
                            )}
                        </div>
                    );
                })}
            </motion.div>

            {/* Back Button */}
            <motion.button
                onClick={() => navigate("/dashboard")}
                className="btn mb-3 d-flex align-items-center gap-2 text-white"
                style={{
                    background: "rgba(255,255,255,0.15)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    borderRadius: "12px",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.93 }}
            >
                <ArrowLeft size={18} />
            </motion.button>
        </div>
    );
}
