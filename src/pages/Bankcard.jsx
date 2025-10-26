import React, { useContext } from "react";
import ThemeContext from "../ThemeContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CreditCard, Smartphone } from "lucide-react";

const BankCard = () => {
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const cards = [
        {
            type: "Physical Card",
            icon: <CreditCard size={40} />,
            description:
                "A real debit card you can use in stores, ATMs, and anywhere worldwide. Delivered right to your door.",
            color: "#00b894",
            image:
                "https://assets-global.website-files.com/5f6b7190797c1e1a2c1b2b2c/5f6b7190797c1e1a2c1b2b2d_debit-card.png"
        },
        {
            type: "Virtual Card",
            icon: <Smartphone size={40} />,
            description:
                "Shop online safely with your instantly issued virtual card. Manage it anytime from your dashboard.",
            color: "#0984e3",
            image:
                "https://assets-global.website-files.com/5f6b7190797c1e1a2c1b2b2c/5f6b7190797c1e1a2c1b2b2e_virtual-card.png"
        },
    ];

    return (
        <div
            style={{
                minHeight: "100vh",
                background: theme === 'dark' ? "#1d353d" : "#dfe9f3",
                color: theme === 'dark' ? "#fff" : "#111",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "50px 20px",
            }}
        >
            {/* Heading */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                    fontSize: "clamp(1.8rem, 4vw, 3rem)",
                    marginBottom: "20px",
                    textAlign: "center",
                }}
            >
                Choose Your <span style={{ color: "#00b894" }}>Bank Card</span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                    color: "#d1d1d1",
                    textAlign: "center",
                    maxWidth: "600px",
                    marginBottom: "40px",
                    fontSize: "1.1rem",
                }}
            >
                Select between our secure virtual card or our sleek physical debit card.
            </motion.p>

            {/* Card Options */}
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "30px",
                }}
            >
                {cards.map((card, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.6 }}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: `0 0 20px ${card.color}66`,
                        }}
                        style={{
                            backgroundColor: "#243b43",
                            borderRadius: "20px",
                            padding: "25px",
                            width: "300px",
                            textAlign: "center",
                            cursor: "pointer",
                            boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
                            transition: "all 0.3s ease",
                        }}
                    >
                        <motion.div
                            style={{
                                background: card.color,
                                width: "70px",
                                height: "70px",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "0 auto 15px auto",
                            }}
                            whileHover={{ rotate: 10 }}
                        >
                            {card.icon}
                        </motion.div>

                        <h2
                            style={{
                                fontSize: "1.4rem",
                                fontWeight: "700",
                                marginBottom: "10px",
                            }}
                        >
                            {card.type}
                        </h2>

                        <p
                            style={{
                                color: "#ccc",
                                fontSize: "0.95rem",
                                marginBottom: "20px",
                            }}
                        >
                            {card.description}
                        </p>

                        <motion.img
                            src={card.image}
                            alt={card.type}
                            style={{
                                width: "100%",
                                borderRadius: "15px",
                                marginBottom: "20px",
                                boxShadow: `0 0 10px ${card.color}55`,
                            }}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        />

                        <motion.button
                            style={{
                                backgroundColor: card.color,
                                color: "#fff",
                                border: "none",
                                padding: "12px 25px",
                                borderRadius: "30px",
                                fontSize: "1rem",
                                fontWeight: "600",
                                cursor: "pointer",
                                transition: "0.3s",
                                boxShadow: `0 0 10px ${card.color}55`,
                            }}
                            whileHover={{
                                scale: 1.08,
                                boxShadow: `0 0 20px ${card.color}99`,
                            }}
                            onClick={() => alert(`${card.type} requested successfully!`)}
                        >
                            Get Now
                        </motion.button>
                    </motion.div>
                ))}
            </div>

            {/* Back button */}
            <motion.button
                style={{
                    marginTop: "50px",
                    backgroundColor: "#00b894",
                    color: "#fff",
                    border: "none",
                    padding: "12px 25px",
                    borderRadius: "30px",
                    fontSize: "1rem",
                    fontWeight: "600",
                    cursor: "pointer",
                }}
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate("/dashboard")}
            >
                ← 
            </motion.button>
        </div>
    );
};

export default BankCard;
