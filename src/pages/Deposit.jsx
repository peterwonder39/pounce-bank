import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Bitcoin, CreditCard, Send, ArrowLeft, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Deposit() {
    const navigate = useNavigate();
    const [showCryptoOptions, setShowCryptoOptions] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState("");

    const wallets = {
        BTC: "bc1q9xkflajkd86w33g2knc3t5zleeqzdsdz9acvrf",
        USDT: "TEiVS4pKpn3GNfq8pySFX8NGvheMfF4TTo" // TRC20 example
    };

    const [copied, setCopied] = useState(false);

    const copyAddress = (address) => {
        navigator.clipboard.writeText(address);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };


    return (
        <div
            className="min-vh-100 d-flex flex-column align-items-center justify-content-center p-4"
            style={{
                background: "linear-gradient(135deg,#0f2027, #203a43, #2c5364)",
            }}
        >
            {/* CONTAINER */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="p-4 rounded-4 shadow-lg"
                style={{
                    width: "100%",
                    maxWidth: "450px",
                    backdropFilter: "blur(14px)",
                    background: "rgba(255, 255, 255, 0.12)",
                    border: "1px solid rgba(255,255,255,0.25)",
                }}
            >
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

                <motion.h2
                    className="fw-bold text-center text-white mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Deposit Funds
                </motion.h2>

                {/* Deposit Options */}
                <div className="d-flex flex-column gap-3">

                    {/* PAY WITH CRYPTO */}
                    <motion.button
                        className="btn py-3 fw-semibold text-white d-flex align-items-center justify-content-center gap-2"
                        style={{
                            background: "#2c5364",
                            borderRadius: "40px",
                            fontSize: "18px",
                        }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            setShowCryptoOptions(!showCryptoOptions);
                            setSelectedCoin("");
                        }}
                    >
                        <Bitcoin size={20} />
                        Pay with Crypto
                    </motion.button>

                    {/* SHOW CRYPTO OPTIONS */}
                    {showCryptoOptions && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="d-flex flex-column gap-2"
                        >
                            {/* BTC BUTTON */}
                            <motion.button
                                className="btn text-white d-flex align-items-center justify-content-center gap-2 py-3"
                                style={{
                                    background: "#2c5364",
                                    borderRadius: "40px",
                                }}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedCoin("BTC")}
                            >
                                <Bitcoin size={20} />
                                Bitcoin (BTC)
                            </motion.button>

                            {/* USDT BUTTON */}
                            <motion.button
                                className="btn text-white d-flex align-items-center justify-content-center gap-2 py-3"
                                style={{
                                    background: "#0077b6",
                                    borderRadius: "40px",
                                }}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedCoin("USDT")}
                            >
                                <DollarSign size={20} />
                                USDT (TRC20)
                            </motion.button>

                            {/* SHOW WALLET AFTER SELECTING COIN */}
                            {selectedCoin && (
                                <motion.div
                                    className="p-3 rounded shadow-sm mt-2"
                                    style={{
                                        background: "rgba(255, 255, 255, 0.85)",
                                        backdropFilter: "blur(5px)",
                                        border: "1px solid #e3e3e3",
                                    }}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                >
                                    <p className="fw-bold mb-2 text-dark">{selectedCoin} Wallet:</p>

                                    <div
                                        className="d-flex align-items-center justify-content-between bg-light p-2 rounded"
                                        style={{ border: "1px solid #ccc" }}
                                    >
                                        <span
                                            className="text-break"
                                            style={{ fontSize: "14px", fontWeight: 500 }}
                                        >
                                            {wallets[selectedCoin]}
                                        </span>

                                        <div className="d-flex align-items-center gap-2">
                                            {copied && (
                                                <span
                                                    style={{
                                                        color: "#00b894",
                                                        fontSize: "13px",
                                                        fontWeight: "600",
                                                    }}
                                                >
                                                    Copied!
                                                </span>
                                            )}

                                            <button
                                                className="btn btn-sm text-white"
                                                style={{
                                                    background: "#00b894",
                                                    borderRadius: "8px",
                                                }}
                                                onClick={() => copyAddress(wallets[selectedCoin])}
                                            >
                                                <Copy size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                        </motion.div>
                    )}

                    {/* Transfer */}
                    <motion.button
                        className="btn py-3 fw-semibold text-white d-flex align-items-center justify-content-center gap-2"
                        style={{
                            background: "#2c5364",
                            borderRadius: "40px",
                            fontSize: "18px",
                        }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/transfer")}
                    >
                        <Send size={20} />
                        Transfer
                    </motion.button>

                    {/* Pay with Card */}
                    <motion.button
                        className="btn py-3 fw-semibold text-white d-flex align-items-center justify-content-center gap-2"
                        style={{
                            background: "#2c5364",
                            borderRadius: "40px",
                            fontSize: "18px",
                        }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("")}
                    >
                        <CreditCard size={20} />
                        Pay with Card
                    </motion.button>

                </div>
            </motion.div>
        </div>
    );
}
