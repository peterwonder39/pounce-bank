import React, { useContext } from "react";
import ThemeContext from "../ThemeContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; 
import img from "../assets/newpounce-removebg-preview.png";

const Hero = () => {
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();

    return (
        <div
            style={{
                minHeight: "100vh",
                width: "100%",
                background: theme === 'dark' ? "linear-gradient(135deg, #0f2027, #203a43, #2c5364)" : "linear-gradient(135deg, #dfe9f3, #ffffff)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                color: theme === 'dark' ? "white" : "#111",
                padding: "5px",
                overflow: "hidden",
            }}
        >
            
            <motion.img
                src={img}
                alt="Pounce"
                style={{ maxWidth: "50%", height: "30vh" }}
                className="img-fluid"
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: [0, -15, 0], opacity: 1 }}
                transition={{
                    duration: 1.5,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
            />

            
            <motion.h1
                style={{
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                    fontWeight: "700",
                    marginBottom: "5px",
                }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                Welcome to <span style={{ color: "#00b894" }}>pounce bank</span> 💳
            </motion.h1>

            
            <motion.p
                style={{
                    fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
                    marginBottom: "20px",
                    color: "#ddd",
                    maxWidth: "600px",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
            >
                Manage your money smartly, securely, and easily — anywhere, anytime.
            </motion.p>

            
            <motion.div
                style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
            >
                <motion.button
                    style={{
                        backgroundColor: "#00b894",
                        color: "#fff",
                        padding: "12px 28px",
                        border: "none",
                        borderRadius: "30px",
                        fontSize: "1rem",
                        fontWeight: "600",
                        cursor: "pointer",
                        flex: "1 1 auto",
                        minWidth: "150px",
                        boxShadow: "0 0 10px rgba(0,184,148,0.5)",
                    }}
                    whileHover={{
                        scale: 1.08,
                        boxShadow: "0 0 20px rgba(0,184,148,0.9)",
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onClick={() => navigate("/signup")}
                >
                    Open an Account
                </motion.button>

                <motion.button
                    style={{
                        backgroundColor: "#1a252f",
                        color: "#fff",
                        padding: "12px 28px",
                        border: "none",
                        borderRadius: "30px",
                        fontSize: "1rem",
                        fontWeight: "600",
                        cursor: "pointer",
                        flex: "1 1 auto",
                        minWidth: "150px",
                        boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                    }}
                    whileHover={{
                        scale: 1.08,
                        boxShadow: "0 0 20px rgba(255,255,255,0.15)",
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onClick={() => navigate("/signin")}
                >
                    Login
                </motion.button>
            </motion.div>

            {/* Floating glow circles for background depth */}
            <motion.div
                style={{
                    position: "absolute",
                    bottom: "10%",
                    left: "15%",
                    width: "100px",
                    height: "100px",
                    background: "rgba(0,184,148,0.2)",
                    borderRadius: "50%",
                    filter: "blur(60px)",
                }}
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                style={{
                    position: "absolute",
                    top: "10%",
                    right: "20%",
                    width: "120px",
                    height: "120px",
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: "50%",
                    filter: "blur(80px)",
                }}
                animate={{ y: [0, -25, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
    );
};

export default Hero;
