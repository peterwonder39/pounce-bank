// Finance.jsx
import React, { useState, useEffect, useContext } from "react";
import ThemeContext from "../ThemeContext";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    TrendingUp,
    TrendingDown,
    PieChart as PieChartIcon,
    Wallet2,
} from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";

const THEME = {
    primary: "#1d353d",
    accent: "#00b894",
    light: "#f8f9fa",
    dark: "#0f2027",
    red: "#ff7675",
    blue: "#0984e3",
};

const currencyFormat = (amount) =>
    new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
    }).format(amount);

const Finance = () => {
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser);

        // Example Transactions
        setTransactions([
            { id: 1, type: "Credit", amount: 5200, date: "2025-09-28", desc: "Salary Payment" },
            { id: 2, type: "Debit", amount: 180, date: "2025-09-30", desc: "Electricity Bill" },
            { id: 3, type: "Debit", amount: 30, date: "2025-10-02", desc: "Airtime Top-up" },
            { id: 4, type: "Credit", amount: 200, date: "2025-10-05", desc: "Refund" },
        ]);
    }, []);

    const data = [
        { name: "Income", value: 6000, color: THEME.accent },
        { name: "Expenses", value: 1500, color: THEME.red },
        { name: "Savings", value: 4500, color: THEME.blue },
    ];

    return (
        <div
            style={{
                minHeight: "100vh",
                background: theme === 'dark' ? `linear-gradient(135deg, ${THEME.primary}, #2c5364)` : "linear-gradient(135deg, #dfe9f3, #ffffff)",
                color: theme === 'dark' ? "#fff" : "#111",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                    width: "100%",
                    maxWidth: 900,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 12,
                    marginBottom: 30,
                }}
            >
                <h1
                    style={{
                        fontSize: "clamp(1.5rem, 4vw, 2rem)",
                        fontWeight: 700,
                    }}
                >
                    Finance Overview
                </h1>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate("/dashboard")}
                    style={{
                        background: THEME.accent,
                        color: "#000",
                        padding: "8px 18px",
                        border: "none",
                        borderRadius: "25px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontWeight: 600,
                        fontSize: "clamp(0.85rem, 2vw, 1rem)",
                    }}
                >
                    <ArrowLeft size={16} /> 
                </motion.button>
            </motion.div>

            {/* Balance Summary */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: 20,
                    padding: "clamp(20px, 5vw, 30px)",
                    width: "100%",
                    maxWidth: 600,
                    marginBottom: 30,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                }}
            >
                <h3 style={{ marginBottom: 10, color: "#ddd" }}>Total Balance</h3>
                <div
                    style={{
                        fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                        fontWeight: 800,
                        color: THEME.accent,
                        marginBottom: 20,
                    }}
                >
                    {currencyFormat(user?.balance || 0)}
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                        gap: 16,
                    }}
                >
                    <StatCard icon={<TrendingUp />} label="Total Income" value={currencyFormat(0)} />
                    <StatCard icon={<TrendingDown />} label="Total Expenses" value={currencyFormat(0)} />
                    <StatCard icon={<PieChartIcon />} label="Savings Rate" value="0%" />
                </div>
            </motion.div>

            {/* Spending Breakdown */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                    width: "100%",
                    maxWidth: 800,
                    background: "rgba(255, 255, 255, 0.08)",
                    borderRadius: 16,
                    padding: "clamp(16px, 4vw, 24px)",
                    marginBottom: 30,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
                }}
            >
                <h3 style={{ marginBottom: 15 }}>Spending Breakdown</h3>

                <div style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                outerRadius="80%"
                                innerRadius="50%"
                                paddingAngle={5}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value) => currencyFormat(value)}
                                contentStyle={{
                                    background: "#1d353d",
                                    color: "#fff",
                                    borderRadius: 8,
                                    border: "none",
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        gap: 12,
                        marginTop: 15,
                    }}
                >
                    {data.map((d, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <div
                                style={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: "50%",
                                    background: d.color,
                                }}
                            ></div>
                            <span style={{ fontSize: 13 }}>{d.name}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Transaction History */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{
                    width: "100%",
                    maxWidth: 800,
                    background: "rgba(255, 255, 255, 0.08)",
                    borderRadius: 16,
                    padding: "clamp(16px, 4vw, 24px)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
                }}
            >
                <h3 style={{ marginBottom: 15 }}>Recent Transactions</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {transactions.map((tx) => (
                        <motion.div
                            key={tx.id}
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 250 }}
                            style={{
                                background: "rgba(0,0,0,0.25)",
                                borderRadius: 12,
                                padding: "12px 16px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                flexWrap: "wrap",
                                gap: 10,
                            }}
                        >
                            <div>
                                <div style={{ fontWeight: 600 }}>{tx.desc}</div>
                                <div style={{ fontSize: 12, color: "#ccc" }}>{tx.date}</div>
                            </div>
                            <div
                                style={{
                                    fontWeight: 700,
                                    color: tx.type === "Credit" ? "#00b894" : "#ff7675",
                                    fontSize: "clamp(0.9rem, 2vw, 1rem)",
                                }}
                            >
                                {tx.type === "Credit" ? "+" : "-"}
                                {currencyFormat(0)}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Footer */}
            <div
                style={{
                    marginTop: 50,
                    fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
                    color: "rgba(255,255,255,0.6)",
                    textAlign: "center",
                }}
            >
                <Wallet2 size={14} style={{ marginRight: 4 }} />
                Pounce Bank Finance — Empowering Smart Spending 
            </div>
        </div>
    );
};

const StatCard = ({ icon, label, value }) => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
        style={{
            background: "rgba(0, 0, 0, 0.25)",
            borderRadius: 16,
            padding: "18px 14px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 8,
        }}
    >
        <div style={{ color: "#00b894" }}>{icon}</div>
        <div style={{ fontSize: 13, color: "#aaa" }}>{label}</div>
        <div style={{ fontSize: "clamp(1rem, 3vw, 1.2rem)", fontWeight: 700 }}>{value}</div>
    </motion.div>
);

export default Finance;
