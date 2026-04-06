import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { token, error } = useSelector((state: any) => state.auth);

  const [data, setData] = useState({ username: "", password: "" });

  
  useEffect(() => {
    if (token) {
      navigate("/students");
    }
  }, [token]);

  const handleLogin = () => {
    dispatch(loginUser(data));
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logo}>SMS</div>
        <h2 style={styles.title}>Welcome back</h2>
        <p style={styles.subtitle}>Sign in to your account</p>

      
        {error && (
          <p style={styles.error}>Invalid username or password</p>
        )}

        <div style={styles.field}>
          <label style={styles.label}>Username</label>
          <input
            style={styles.input}
            placeholder="Enter username"
            onChange={e => setData({ ...data, username: e.target.value })}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Password</label>
          <input
            style={styles.input}
            type="password"
            placeholder="Enter password"
            onChange={e => setData({ ...data, password: e.target.value })}
          />
        </div>

        <button style={styles.button} onClick={handleLogin}>
          Sign In →
        </button>

        <p style={styles.hint}>Default: admin / admin</p>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "48px 40px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    width: "52px",
    height: "52px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    color: "#fff",
    fontWeight: "800",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
    letterSpacing: "1px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#111827",
    margin: "0 0 6px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#6b7280",
    margin: "0 0 32px",
  },
  field: {
    width: "100%",
    marginBottom: "18px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    border: "1.5px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "15px",
    color: "#111827",
    outline: "none",
    boxSizing: "border-box" as const,
    background: "#f9fafb",
    transition: "border-color 0.2s",
  },
  button: {
    width: "100%",
    marginTop: "8px",
    padding: "13px",
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    letterSpacing: "0.3px",
  },
  hint: {
    marginTop: "20px",
    fontSize: "12px",
    color: "#9ca3af",
  },
};

export default Login;