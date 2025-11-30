// Dashboard.jsx
import React, { useState, useEffect, useRef, useContext } from "react";
import ThemeContext from "../ThemeContext";
import { motion } from "framer-motion"
import {
    LogOut,
    Sun,
    Moon,
    Send,
    PlusCircle,
    Smartphone,
    FileText,
    Eye,
    EyeOff,
    Menu,
    User,
    CreditCard,
    BarChart3,
    Gauge,
    Shield
} from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

const THEMES = {
    dark: {
        bgGradient: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        surface: "rgba(255,255,255,0.05)",
        cardShadow: "0 8px 30px rgba(2,6,23,0.6)",
        accent: "#00b894",
        accentDark: "#019670",
        muted: "#c7d2d9",
        text: "#e6eef3",
        sidebarBg: "#11202a",
    },
    light: {
        bgGradient: "linear-gradient(135deg, #dfe9f3, #ffffff)",
        surface: "#f8fafc",
        cardShadow: "0 2px 8px rgba(0,0,0,0.1)",
        accent: "#2c5364",
        accentDark: "#0f2027",
        muted: "#555",
        text: "#111",
        sidebarBg: "#e9eff3",
    },
};

const MOCK_TRANSACTIONS = [
    { id: 1, date: "2025-09-25", type: "deposit", desc: "Salary", amount: 2500.0, to: null },
    { id: 2, date: "2025-09-24", type: "withdraw", desc: "ATM Withdrawal", amount: -100.0, to: null },
    { id: 3, date: "2025-09-23", type: "transfer", desc: "Rent", amount: -1200.0, to: "Landlord" },
    { id: 4, date: "2025-09-22", type: "deposit", desc: "Refund", amount: 45.0, to: null },
];

const formatCurrency = (n) =>
    n.toLocaleString("en-GB", { style: "currency", currency: "GBP" });


const SmallBarChart = ({ data = [], width = 300, height = 120 }) => {
    if (!data || data.length === 0) return null;
    const max = Math.max(...data.map((d) => d.value), 1);
    const padding = 12;
    const barGap = 8;
    const barWidth = (width - padding * 2 - barGap * (data.length - 1)) / data.length;

    return (
        <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} preserveAspectRatio="xMidYMid meet">
            <rect x="0" y="0" width={width} height={height} fill="none" />
            {data.map((d, i) => {
                const barHeight = (d.value / max) * (height - 40);
                const x = padding + i * (barWidth + barGap);
                const y = height - barHeight - 20;
                return (
                    <g key={d.key + '-' + i}>
                        <rect
                            x={x}
                            y={y}
                            width={barWidth}
                            height={barHeight}
                            rx="6"
                            ry="6"
                            fill="rgba(255,255,255,0.12)"
                        />
                        <text x={x + barWidth / 2} y={height - 6} fontSize="10" fill="rgba(255,255,255,0.85)" textAnchor="middle">
                            {d.key}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
};


export default function Dashboard() {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
    // const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [balanceVisible, setBalanceVisible] = useState(true);
    const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
    const [modal, setModal] = useState(null); // deposit | transfer | topup | bill | profile | logoutConfirm
    const recipientRef = useRef(null);
    const amountRef = useRef(null);
    const [error, setError] = useState("");
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState("all"); // all / deposit / transfer / bill / withdraw
    const [notifications, setNotifications] = useState([]);
    const [recentBeneficiaries, setRecentBeneficiaries] = useState([]);
    const [profileDraft, setProfileDraft] = useState({ fullName: "", accountNumber: "" });
    const navigate = useNavigate();
    const [recipientAccount, setRecipientAccount] = useState("");
    const [amount, setAmount] = useState("");
    const [transactions, setTransactions] = useState([]);
    // Theme from context
    const { theme, setTheme } = useContext(ThemeContext);



    const THEME = THEMES[theme];
    const isMobile = windowWidth <= 768;

    // load user + transactions from localStorage (persisted)


    // keep localStorage in sync when transactions or user change
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        }
    }, [user]);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
            setTransactions(storedUser.transactions || []); // 🧾 load stored transactions
        }
    }, []);

    useEffect(() => {
        const handleStorageChange = () => {
            const updatedUser = JSON.parse(localStorage.getItem("user"));
            setUser(updatedUser);
        };

        // When localStorage changes (even across tabs)
        window.addEventListener("storage", handleStorageChange);

        // Also handle local updates in same tab
        const interval = setInterval(handleStorageChange, 1000);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            clearInterval(interval);
        };
    }, []);


    useEffect(() => {
        localStorage.setItem("transactions", JSON.stringify(transactions));
        const bens = Array.from(new Set(transactions.filter(t => t.to).map(t => t.to))).slice(0, 5);
        setRecentBeneficiaries(bens);
    }, [transactions]);

    // Remove local theme effect, now handled globally

    // resize handler for responsive behavior
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // safety: show loading while user is null
    if (!user) return <div style={{ padding: 24, color: "#fff" }}>Loading your account...</div>;

    /* -------------------------
       Utility helpers
       ------------------------- */
    const pushNotification = (text, kind = "info", ttl = 3500) => {
        const id = Math.random().toString(36).slice(2, 9);
        const n = { id, text, kind };
        setNotifications((s) => [n, ...s].slice(0, 5));
        setTimeout(() => setNotifications((s) => s.filter((m) => m.id !== id)), ttl);
    };

    const addTransaction = (type, desc, amount, to = null) => {
        const tx = {
            id: Math.random(),
            date: new Date().toISOString().slice(0, 10),
            type,
            desc,
            amount,
            to,
        };
        setTransactions((s) => [tx, ...s]);
    };

    

    

    // logout: clear storage and redirect
    const doLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // optionally keep transactions in storage for demo; here we clear them too
        localStorage.removeItem("transactions");
        window.location.href = "/signin";
    };

    // transaction filtering
    const filteredTransactions = transactions.filter((tx) => {
        const q = query.trim().toLowerCase();
        if (filter !== "all" && tx.type !== filter) return false;
        if (!q) return true;
        return (
            (tx.desc && tx.desc.toLowerCase().includes(q)) ||
            (tx.date && tx.date.includes(q)) ||
            (tx.to && tx.to.toLowerCase().includes(q)) ||
            (String(tx.amount) && String(tx.amount).includes(q))
        );
    });

    // chart data: sum by type (positive -> deposit, negative -> others)
    const chartData = (() => {
        const map = {};
        transactions.forEach((t) => {
            const key = t.type;
            map[key] = (map[key] || 0) + Math.abs(t.amount);
        });
        return Object.keys(map).map((k) => ({ key: k, value: map[k] }));
    })();

    /* -------------------------
       JSX
       ------------------------- */
    return (
        <div
            style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                minHeight: "100vh",
                background: THEME.bgGradient,
                color: THEME.text,
                fontFamily: "Inter, system-ui, sans-serif",
                transition: "all 0.3s ease",
            }}
        >
            {/* Sidebar */}
            <aside
                style={{
                    position: isMobile ? "fixed" : "relative",
                    top: 0,
                    left: sidebarOpen ? 0 : isMobile ? "-100%" : 0,
                    height: isMobile ? "100vh" : "auto",
                    width: isMobile ? "72%" : 260,
                    background: THEME.sidebarBg,
                    padding: 18,
                    transition: "all 0.25s ease",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    zIndex: 200,
                }}
            >
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: "50%",
                                background: THEME.accent,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: "700",
                                color: "#000",
                                fontSize: 18,
                            }} onClick={() => navigate("/profile")}
                        >
                            {user.fullName ? user.fullName.charAt(0).toUpperCase() : ""}
                        </div>
                        <div style={{ overflow: "hidden" }}>
                            <div style={{ fontWeight: 700, whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
                                {(user.fullName || `${user.firstName} ${user.lastName || ""}`).toUpperCase()}
                            </div>
                            <div style={{ fontSize: 12, color: THEME.muted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {user.accountNumber}
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: 20 }}>
                        <div style={{ fontSize: 13, color: THEME.muted, marginBottom: 8 }}>Quick Actions</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => navigate("/bankcard")}
                                style={btn(THEME.accent, "#000")}
                            >
                                <CreditCard size={14} /> Bank Card
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => navigate("/finance")}
                                style={btn(THEME.accentDark, "#fff")}
                            >
                                <BarChart3 size={14} /> Finance
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => navigate("/AccountLimits")}
                                style={btn(THEME.accent, "#000")}
                            >
                                <Gauge size={14} /> Account Limits
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => navigate("/security")}
                                style={btn(THEME.accentDark, "#fff")}
                            >
                                <Shield size={14} /> Security Center
                            </motion.button>
                        </div>
                    </div>

                    <div style={{ marginTop: 20 }}>
                        <div style={{ fontSize: 13, color: THEME.muted, marginBottom: 8 }}>Recent Beneficiaries</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            {recentBeneficiaries.length === 0 && (
                                <div style={{ fontSize: 12, color: THEME.muted }}>No beneficiaries yet</div>
                            )}
                            {recentBeneficiaries.map((b) => (
                                <button
                                    key={b}
                                    onClick={() => {
                                        setModal("transfer");
                                        setTimeout(() => {
                                            if (recipientRef.current) recipientRef.current.value = b;
                                        }, 10);
                                    }}
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        padding: "8px 10px",
                                        borderRadius: 8,
                                        background: "rgba(255,255,255,0.03)",
                                        border: "none",
                                        color: "inherit",
                                        cursor: "pointer",
                                    }}
                                >
                                    <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                        <User size={14} /> {b}
                                    </span>
                                    <span style={{ fontWeight: 700 }}>→</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={{ display: "flex", gap: 10, alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                        <button
                            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
                            style={iconBtn}
                            title="Toggle theme"
                        >
                            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                        <button onClick={() => navigate("/profile")} style={iconBtn} title="Profile">
                            <User size={18} />
                        </button>
                    </div>

                    <div>
                        <button
                            onClick={() => setModal("logoutConfirm")}
                            style={{ ...iconBtn, padding: 8 }}
                            title="Log out"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* mobile overlay for menu */}
            {isMobile && sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0,0,0,0.45)",
                        zIndex: 150,
                    }}
                />
            )}

            {/* Main content */}
            <main style={{ flex: 1, padding: isMobile ? 16 : 28, width: "100%", boxSizing: "border-box" }}>
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        {isMobile && (
                            <button onClick={() => setSidebarOpen((s) => !s)} style={iconBtn} aria-label="Menu">
                                <Menu size={22} />
                            </button>
                        )}
                        <div>
                            <h2 style={{ margin: 0, fontSize: isMobile ? 18 : 22 }}>
                                HELLO,{" "}
                                {user.firstName
                                    ? user.firstName.toUpperCase()
                                    : user.fullName
                                        ? user.fullName.split(" ")[0].toUpperCase()
                                        : "USER" } 👋
                            </h2>
                            
                        </div>
                    </div>

                    
                </div>

                {/* Balance + Chart Row */}
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 360px", gap: 16, marginBottom: 20 }}>
                    <section
                        style={{
                            background: THEME.surface,
                            borderRadius: 12,
                            padding: 18,
                            boxShadow: THEME.cardShadow,
                            textAlign: "left",
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                                <h6 style={{ margin: 0 }}>Available Balance</h6>

                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <h6 style={{ fontSize: isMobile ? "1rem" : "1.7rem", margin: 0 }}>
                                    {balanceVisible ? formatCurrency(user.balance) : "••••••••"}
                                </h6>
                                <button onClick={() => setBalanceVisible((s) => !s)} style={iconBtn}>
                                    {balanceVisible ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                            </div>
                        </div>

                    </section>

                    <section
                        style={{
                            background: THEME.surface,
                            borderRadius: 12,
                            padding: 14,
                            boxShadow: THEME.cardShadow,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            minHeight: 120,
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h6>Spending Summary</h6>
                            <div style={{ fontSize: 12, color: THEME.muted }}></div>
                        </div>
                        <div style={{ marginTop: 8 }}>
                            <SmallBarChart
                                data={chartData.map((d) => ({ key: d.key[0].toUpperCase(), value: d.value }))}
                                width={320}
                                height={120}
                            />
                        </div>
                    </section>
                </div>

                {/* Action Buttons */}
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 18 }}>
                    <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        onClick={() => navigate("/deposit")}
                        style={btn(THEME.accent, "#000")}
                    >
                        <PlusCircle size={14} /> Deposit
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        onClick={() => navigate("/transfer")}
                        style={btn(THEME.accentDark, "#fff")}
                    >
                        <Send size={14} /> Transfer
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        onClick={() => navigate("/withdraw")}
                        style={btn(THEME.accent, "#000")}
                    >
                        <Smartphone size={14} /> Withdraw
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        onClick={() => navigate("/paybill")}
                        style={btn(THEME.accentDark, "#fff")}
                    >
                        <FileText size={14} /> Pay Bill
                    </motion.button>
                </div>
                {/* Transactions list / table */}
                <section
                    style={{
                        background: THEME.surface,
                        borderRadius: 12,
                        padding: 18,
                        boxShadow: THEME.cardShadow,
                    }}
                >
                    <h3 style={{ marginTop: 0 }}>Recent Transactions</h3>

                    {transactions.length === 0 ? (
                        <div style={{ color: THEME.muted }}>No transactions yet.</div>
                    ) : (
                        <div style={{ overflowX: "auto" }}>
                            <table
                                style={{
                                    width: "100%",
                                    borderCollapse: "collapse",
                                    fontSize: 14,
                                }}
                            >
                                <thead>
                                    <tr>
                                        <th style={th}>Date</th>
                                        <th style={th}>Description</th>
                                        <th style={th}>Type</th>
                                        <th style={th}>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((tx, index) => (
                                        <tr key={index}>
                                            <td style={td}>{tx.date}</td>
                                            <td style={td}>{tx.desc}</td>
                                            <td style={td}>
                                                {tx.type === "credit" || tx.type === "transfer-in" ? "Credit" : "Debit"}
                                            </td>
                                            <td
                                                style={{
                                                    ...td,
                                                    color:
                                                        tx.type === "credit" || tx.type === "transfer-in"
                                                            ? "#4ee08a"
                                                            : "#ff8a8a",
                                                    fontWeight: 700,
                                                }}
                                            >
                                                {tx.type === "credit" || tx.type === "transfer-in"
                                                    ? `+${formatCurrency(tx.amount)}`
                                                    : `-${formatCurrency(Math.abs(tx.amount))}`}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>

            </main>

            {/* Notifications (toasts) */}
            <div style={{ position: "fixed", right: 14, top: 14, zIndex: 1200 }}>
                {notifications.map((n) => (
                    <div
                        key={n.id}
                        style={{
                            background: n.kind === "error" ? "rgba(255,80,80,0.95)" : "rgba(0,0,0,0.65)",
                            color: "#fff",
                            padding: "8px 12px",
                            borderRadius: 8,
                            marginBottom: 8,
                            minWidth: 180,
                            boxShadow: "0 6px 18px rgba(0,0,0,0.45)",
                        }}
                    >
                        {n.text}
                    </div>
                ))}
            </div>

            {/* Modals */}
            {modal === "deposit" && (
                <Modal title="Deposit Funds" onClose={() => setModal(null)}>
                    <DepositForm
                        onSubmit={(amt) => {
                            doDeposit(amt);
                        }}
                    />
                </Modal>
            )}




            {modal === "topup" && (
                <Modal title="Mobile Top-Up" onClose={() => setModal(null)}>
                    <DepositForm labelText="Top-Up Amount (£)" onSubmit={(amt) => doDeposit(amt)} />
                </Modal>
            )}

            {modal === "bill" && (
                <Modal title="Bill Payment" onClose={() => setModal(null)}>
                    <DepositForm
                        labelText="Bill Amount (£)"
                        onSubmit={(amt) => {
                            // treat bill as transfer to "Bill Payment"
                            doTransfer("Bill Payment", amt, "bill");
                        }}
                    />
                </Modal>
            )}

            {modal === "profile" && (
                <Modal title="Profile Settings" onClose={() => setModal(null)}>
                    <div>
                        <label style={label}>Full name</label>
                        <input
                            value={profileDraft.fullName}
                            onChange={(e) => setProfileDraft((p) => ({ ...p, fullName: e.target.value }))}
                            style={input}
                        />
                        <label style={label}>Account number</label>
                        <input
                            value={profileDraft.accountNumber}
                            onChange={(e) => setProfileDraft((p) => ({ ...p, accountNumber: e.target.value }))}
                            style={input}
                        />
                        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                            <button
                                onClick={() => {
                                    // save profile
                                    setUser((u) => {
                                        const [firstName, lastName = ""] = (profileDraft.fullName || "").split(" ");
                                        const updated = { ...u, firstName, lastName, fullName: profileDraft.fullName, accountNumber: profileDraft.accountNumber };
                                        pushNotification("Profile updated", "success");
                                        return updated;
                                    });
                                    setModal(null);
                                }}
                                style={submit}
                            >
                                Save
                            </button>
                            <button onClick={() => setModal(null)} style={{ ...submit, background: "transparent", color: THEME.text, border: "1px solid rgba(255,255,255,0.06)" }}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </Modal>
            )}

            {modal === "logoutConfirm" && (
                <Modal title="Confirm Logout" onClose={() => setModal(null)}>
                    <div>
                        <p>Are you sure you want to logout? This will clear your session.</p>
                        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                            <button
                                onClick={() => {
                                    doLogout();
                                }}
                                style={submit}
                            >
                                Logout
                            </button>
                            <button onClick={() => setModal(null)} style={{ ...submit, background: "transparent", color: THEME.text, border: "1px solid rgba(255,255,255,0.06)" }}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}

/* -------------------------
   Styles & small components
   ------------------------- */
const iconBtn = {
    background: "transparent",
    border: "none",
    color: "inherit",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
};

const btn = (bg, color) => ({
    background: bg,
    color,
    border: "none",
    borderRadius: 8,
    padding: "8px 12px",
    cursor: "pointer",
    fontWeight: 600,
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontSize: 14,
});

const chip = {
    border: "none",
    background: "rgba(255,255,255,0.04)",
    padding: "6px 8px",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 13,
};

const th = { textAlign: "left", padding: "10px 8px", color: "#aaa" };
const td = { padding: "10px 8px", borderBottom: "1px solid rgba(255,255,255,0.05)" };
const label = { fontSize: 13, display: "block", marginTop: 12 };
const input = {
    width: "100%",
    padding: "10px",
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.06)",
    background: "transparent",
    color: "inherit",
    marginTop: 6,
    outline: "none",
};
const submit = {
    marginTop: 4,
    padding: "10px 16px",
    background: "#00b894",
    color: "#000",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
};

const Modal = ({ title, onClose, children }) => (
    <div
        style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: 16,
        }}
    >
        <div style={{ background: "#14212b", padding: 18, borderRadius: 12, width: "100%", maxWidth: 480 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <strong>{title}</strong>
                <button onClick={onClose} style={{ background: "transparent", border: "none", color: "#999", fontSize: 18 }}>
                    ×
                </button>
            </div>
            {children}
        </div>
    </div>
);

const DepositForm = ({ onSubmit, labelText = "Amount (£)" }) => {
    const ref = useRef(null);
    const [err, setErr] = useState("");
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                const val = ref.current.value;
                if (!val || Number(val) <= 0) {
                    setErr("Enter a valid amount");
                    return;
                }
                onSubmit(val);
            }}
        >
            <label style={label}>{labelText}</label>
            <input ref={ref} type="number" style={input} />
            {err && <div style={{ color: "tomato", fontSize: 12 }}>{err}</div>}
            <button type="submit" style={submit}>
                Confirm
            </button>
        </form>
    );
};
