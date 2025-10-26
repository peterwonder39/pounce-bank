import React, { useState, useContext, useEffect } from "react";
import ThemeContext from "../ThemeContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Send, ArrowLeftCircle } from "lucide-react";
import Loader from "../pages/Loader";

// Format as GBP
const formatCurrency = (n) => {
    if (!n && n !== 0) return "";
    return Number(n).toLocaleString("en-GB", { style: "currency", currency: "GBP" });
};

const Transfer = () => {
    const navigate = useNavigate();
    const [recipientAccount, setRecipientAccount] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [fetchingName, setFetchingName] = useState(false);
    const [recipientName, setRecipientName] = useState("");
    const [formError, setFormError] = useState("");


    useEffect(() => {
        if (recipientAccount.length === 10) {
            setFetchingName(true);
            axios
                .get(`https://backend-pounce.onrender.com/user/recipient/${recipientAccount}`)
                .then((res) => {
                    setRecipientName(res.data.fullName. toUpperCase());
                })
                .catch(() => {
                    setRecipientName("Account not found");
                })
                .finally(() => setFetchingName(false));
        } else {
            setRecipientName("");
        }
    }, [recipientAccount]);





    const handleTransfer = (e) => {
        e.preventDefault();
        setFormError("");
        if (!recipientAccount || !amount) {
            setFormError("Please fill in all details.");
            return;
        }
        setLoading(true);

        //  Read user from localStorage
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user._id) return alert("User not found. Please log in again.");

        //  Construct transfer data
        const transferData = {
            senderId: user._id,
            recipientAccount,
            amount: parseFloat(amount), // ensure it's a number
        };

        setLoading(true);

        axios
            .post("https://backend-pounce.onrender.com/user/transfer", transferData)
            .then((res) => {


                const updatedUser = {
                    ...user,
                    balance: res.data.newBalance,
                    transactions: [
                        {
                            date: new Date().toISOString().slice(0, 10),
                            type: "transfer",
                            desc: `Transfer to ${recipientAccount}`,
                            amount: -amount,
                            to: recipientAccount,
                        },
                        ...(user.transactions || []),
                    ],
                };

                localStorage.setItem("user", JSON.stringify(updatedUser));

                navigate("/success", {
                    state: {
                        amount: amount,
                        recipientAccount: recipientAccount,
                        newBalance: res.data.newBalance,
                        recipientName: recipientName
                    }
                });
            })
            .catch((err) => {
                console.error("Transfer Error:", err);
                alert(err.response?.data?.message || "Transfer failed");
            })
            .finally(() => setLoading(false));

    };


    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100"
            style={{ background: "#1d353d", color: "#fff", fontFamily: "Inter, sans-serif" }}
        >
            <div
                className="card shadow-lg p-4"
                style={{
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    width: "100%",
                    maxWidth: "420px",
                    borderRadius: "16px",
                    height: "100vh",
                }}
            >
                <div className="d-flex align-items-center mb-3">
                    <button
                        className="btn btn-outline-light btn-sm me-2"
                        onClick={() => navigate("/dashboard")}
                    >
                        <ArrowLeftCircle size={18} />
                    </button>
                    <h4 className="m-0 fw-bold">Send Money</h4>
                </div>

                <p className="text-light-50 mb-4" style={{ opacity: 0.8 }}>
                    Enter recipient’s account number and amount to transfer.
                </p>

                <div className="mb-3">
                    <label className="form-label text-light">Recipient Account</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter account number"
                        value={recipientAccount}
                        onChange={(e) => setRecipientAccount(e.target.value)}
                        style={{
                            background: "rgba(255,255,255,0.15)",
                            color: "#fff",
                            border: "none",
                        }}
                    />
                    {fetchingName ? (
                        <p style={{ color: "#fff" }}>...</p>
                    ) : recipientName ? (
                        <p style={{ color: recipientName === "Account not found" ? "red" : "#fff" }}>
                            {recipientName === "Account not found"
                                ? " Account not found"
                                : ` ${recipientName}`}
                        </p>
                    ) : null}
                </div>

                <div className="mb-4">
                    <label className="form-label text-light">Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        style={{
                            background: "rgba(255,255,255,0.15)",
                            color: "#fff",
                            border: "none",
                        }}
                    />
                    {amount && (
                        <div style={{ color: '#fff', marginTop: 4, fontWeight: 500 }}>
                            {formatCurrency(amount)}
                        </div>
                    )}
                </div>

                {formError && (
                    <div style={{ color: 'red', marginBottom: 10, fontWeight: 500 }}>{formError}</div>
                )}
                <button
                    className="btn w-100 d-flex align-items-center justify-content-center"
                    style={{
                        background: "#00b894",
                        border: "none",
                        color: "#fff",
                        fontWeight: 600,
                        height: "45px",
                        borderRadius: "8px",
                        transition: "0.3s ease",
                        cursor: loading ? "not-allowed" : "pointer",
                    }}
                    onClick={handleTransfer}
                    disabled={loading}
                >
                    {loading ? (
                        <div
                            className="d-flex align-items-center justify-content-center gap-2"
                            style={{ fontSize: "14px" }}
                        >
                            <div
                                style={{
                                    width: "18px",
                                    height: "18px",
                                    border: "2px solid rgba(255, 255, 255, 0.4)",
                                    borderTop: "2px solid #fff",
                                    borderRadius: "50%",
                                    animation: "spin 1s linear infinite",
                                }}
                            ></div>
                            Processing...
                        </div>
                    ) : (
                        <>
                            <Send size={18} className="me-2" /> Send Money
                        </>
                    )}
                </button>

            </div>
        </div>
    );
};

export default Transfer;
