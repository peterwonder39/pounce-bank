// Profile.jsx
import React, { useEffect, useState, useContext } from "react";
import ThemeContext from "../ThemeContext";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, CreditCard, CalendarDays, Edit3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const THEME = {
    primary: "#1d353d",
    accent: "#00b894",
    light: "#f8f9fa",
    dark: "#0f2027",
};

const Profile = () => {
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser);
    }, []);

    if (!user) {
        return (
            <div
                style={{
                    background: theme === 'dark' ? THEME.primary : '#dfe9f3',
                    color: theme === 'dark' ? '#fff' : '#111',
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                }}
            >
                Loading profile...
            </div>
        );
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                background: theme === 'dark' ? `linear-gradient(135deg, ${THEME.primary}, #2c5364)` : "linear-gradient(135deg, #dfe9f3, #ffffff)",
                padding: "20px",
                color: theme === 'dark' ? "#fff" : "#111",
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
                    maxWidth: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 30,
                    flexWrap: "wrap",
                    gap: 12,
                }}
            >
                <h1
                    style={{
                        fontSize: "clamp(1.5rem, 4vw, 2rem)",
                        fontWeight: 700,
                    }}
                >
                    Your Profile
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

            {/* Profile Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: 20,
                    padding: "clamp(20px, 5vw, 30px)",
                    width: "100%",
                    maxWidth: 500,
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                }}
            >
                {/* Avatar + Info */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        textAlign: "center",
                        marginBottom: 30,
                    }}
                >
                    <div
                        style={{
                            width: 90,
                            height: 90,
                            borderRadius: "50%",
                            background: THEME.accent,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "800",
                            fontSize: 36,
                            color: "#000",
                            marginBottom: 15,
                            boxShadow: "0 0 15px rgba(0,0,0,0.3)",
                        }}
                    >
                        {user.fullName ? user.fullName.charAt(0).toUpperCase() : "?"}
                    </div>
                    <h2
                        style={{
                            margin: 0,
                            fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
                        }}
                    >
                        {user.fullName ? user.fullName.toUpperCase() : ""}
                    </h2>
                    <p
                        style={{
                            color: "#ccc",
                            marginTop: 5,
                            fontSize: "clamp(0.85rem, 2vw, 1rem)",
                        }}
                    >
                        Account No: {user.accountNumber}
                    </p>
                </div>

                {/* Info List */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr",
                        gap: "14px",
                    }}
                >
                    <ProfileRow icon={<Mail size={18} />} label="Email" value={user.email} />
                    <ProfileRow
                        icon={<CreditCard size={18} />}
                        label="Balance"
                        value={`£${Number(user.balance).toLocaleString("en-GB")}`}
                    />
                    <ProfileRow
                        icon={<CreditCard size={18} />}
                        label="Account Limit"
                        value={`£${user.accountLimit ? Number(user.accountLimit).toLocaleString("en-GB") : '0'}`}
                    />
                    <ProfileRow
                        icon={<CalendarDays size={18} />}
                        label="Joined On"
                        value={
                            user.createdAt
                                ? new Date(user.createdAt).toLocaleDateString()
                                : "Unavailable"
                        }
                    />
                </div>

                {/* Edit Profile Button */}
                <div style={{ textAlign: "center", marginTop: 30 }}>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                            background: THEME.accent,
                            color: "#000",
                            padding: "10px 25px",
                            border: "none",
                            borderRadius: "30px",
                            fontWeight: 700,
                            cursor: "pointer",
                            fontSize: "clamp(0.9rem, 2vw, 1rem)",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                        }}
                        onClick={() => alert("Profile editing coming soon!")}
                    >
                        <Edit3 size={18} /> Edit Profile
                    </motion.button>
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
                © {new Date().getFullYear()} Pounce Bank — Secure, Smart & Seamless 💳
            </div>
        </div>
    );
};

const ProfileRow = ({ icon, label, value }) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
        style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "rgba(0, 0, 0, 0.25)",
            borderRadius: 12,
            padding: "14px 18px",
            flexWrap: "wrap",
        }}
    >
        <div style={{ color: "#00b894", flexShrink: 0 }}>{icon}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, color: "#aaa" }}>{label}</div>
            <div
                style={{
                    fontSize: "clamp(0.9rem, 2vw, 1rem)",
                    fontWeight: 600,
                    wordWrap: "break-word",
                }}
            >
                {value}
            </div>
        </div>
    </motion.div>
);

export default Profile;
