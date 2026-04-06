import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchStudents, addStudent, updateStudent, deleteStudent } from "../features/student/studentSlice";
import { logout } from "../features/auth/authSlice";

const empty = { name: "", email: "", age: 0, course: "" };

const Students = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const students = useSelector((state: any) => state.student.list);

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState(empty);
  const [confirmId, setConfirmId] = useState<number | null>(null);

  useEffect(() => { dispatch(fetchStudents()); }, []);

  const openAdd = () => { setEditing(null); setForm(empty); setShowModal(true); };
  const openEdit = (s: any) => { setEditing(s); setForm({ name: s.name, email: s.email, age: s.age, course: s.course }); setShowModal(true); };

  const handleSubmit = async () => {
    if (editing) await dispatch(updateStudent({ id: editing.id, data: form }));
    else await dispatch(addStudent(form));
    dispatch(fetchStudents());
    setShowModal(false);
  };

  const handleDelete = async (id: number) => {
    await dispatch(deleteStudent(id));
    dispatch(fetchStudents());
    setConfirmId(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div style={s.page}>

      {/* Navbar */}
      <div style={s.nav}>
        <div style={s.navBrand}>
          <span style={s.navLogo}>SMS</span>
          <span style={s.navTitle}>Student Management</span>
        </div>
        <button style={s.logoutBtn} onClick={handleLogout}>Logout</button>
      </div>

      <div style={s.content}>
        {/* Header */}
        <div style={s.headerRow}>
          <div>
            <h1 style={s.heading}>Students</h1>
            <p style={s.subheading}>{students.length} enrolled students</p>
          </div>
          <button style={s.addBtn} onClick={openAdd}>+ Add Student</button>
        </div>

        {/* Table */}
        <div style={s.tableWrap}>
          <table style={s.table}>
            <thead>
              <tr>
                {["#", "Name", "Email", "Age", "Course", "Actions"].map(h => (
                  <th key={h} style={s.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr><td colSpan={6} style={s.empty}>No students found. Add one!</td></tr>
              ) : students.map((st: any, i: number) => (
                <tr key={st.id} style={s.tr}>
                  <td style={s.td}>{i + 1}</td>
                  <td style={{ ...s.td, fontWeight: 600 }}>{st.name}</td>
                  <td style={{ ...s.td, color: "#6b7280" }}>{st.email}</td>
                  <td style={s.td}>{st.age}</td>
                  <td style={s.td}><span style={s.badge}>{st.course}</span></td>
                  <td style={{ ...s.td, display: "flex", gap: 8 }}>
                    <button style={s.editBtn} onClick={() => openEdit(st)}>Edit</button>
                    <button style={s.deleteBtn} onClick={() => setConfirmId(st.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div style={s.overlay}>
          <div style={s.modal}>
            <div style={s.modalHeader}>
              <h3 style={s.modalTitle}>{editing ? "Edit Student" : "Add Student"}</h3>
              <button style={s.closeBtn} onClick={() => setShowModal(false)}>✕</button>
            </div>
            {["name", "email", "course"].map(field => (
              <div key={field} style={s.field}>
                <label style={s.label}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  style={s.input}
                  placeholder={`Enter ${field}`}
                  value={(form as any)[field]}
                  onChange={e => setForm({ ...form, [field]: e.target.value })}
                />
              </div>
            ))}
            <div style={s.field}>
              <label style={s.label}>Age</label>
              <input
                style={s.input}
                type="number"
                placeholder="Enter age"
                value={form.age}
                onChange={e => setForm({ ...form, age: +e.target.value })}
              />
            </div>
            <div style={s.modalActions}>
              <button style={s.cancelBtn} onClick={() => setShowModal(false)}>Cancel</button>
              <button style={s.submitBtn} onClick={handleSubmit}>
                {editing ? "Update" : "Add Student"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {confirmId !== null && (
        <div style={s.overlay}>
          <div style={{ ...s.modal, maxWidth: 360 }}>
            <h3 style={s.modalTitle}>Delete Student?</h3>
            <p style={{ color: "#6b7280", margin: "8px 0 24px", fontSize: 14 }}>This cannot be undone.</p>
            <div style={s.modalActions}>
              <button style={s.cancelBtn} onClick={() => setConfirmId(null)}>Cancel</button>
              <button style={s.deleteConfirmBtn} onClick={() => handleDelete(confirmId)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const s: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", background: "#f3f4f6", fontFamily: "'Segoe UI', sans-serif" },
  nav: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "0 32px", height: 60, background: "#fff",
    borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 10,
  },
  navBrand: { display: "flex", alignItems: "center", gap: 10 },
  navLogo: {
    width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
    color: "#fff", fontWeight: 800, fontSize: 12, display: "flex",
    alignItems: "center", justifyContent: "center",
  },
  navTitle: { fontWeight: 700, fontSize: 16, color: "#111827" },
  logoutBtn: {
    padding: "7px 16px", border: "1px solid #e5e7eb", borderRadius: 8,
    background: "#fff", cursor: "pointer", fontSize: 13, color: "#374151",
  },
  content: { maxWidth: 1000, margin: "0 auto", padding: "32px 24px" },
  headerRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 },
  heading: { fontSize: 26, fontWeight: 700, color: "#111827", margin: 0 },
  subheading: { fontSize: 13, color: "#6b7280", margin: "4px 0 0" },
  addBtn: {
    padding: "10px 22px", background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
    color: "#fff", border: "none", borderRadius: 8, fontWeight: 700,
    fontSize: 14, cursor: "pointer",
  },
  tableWrap: { background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb", overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    padding: "12px 16px", textAlign: "left", fontSize: 11, color: "#9ca3af",
    textTransform: "uppercase", letterSpacing: 1, background: "#f9fafb",
    borderBottom: "1px solid #e5e7eb",
  },
  tr: { borderBottom: "1px solid #f3f4f6" },
  td: { padding: "14px 16px", fontSize: 14, color: "#374151" },
  badge: {
    padding: "3px 10px", borderRadius: 999, background: "#ede9fe",
    color: "#6d28d9", fontSize: 12, fontWeight: 600,
  },
  empty: { textAlign: "center", padding: 40, color: "#9ca3af", fontSize: 14 },
  editBtn: {
    padding: "5px 14px", border: "1px solid #c7d2fe", borderRadius: 6,
    background: "#eef2ff", color: "#4f46e5", cursor: "pointer", fontSize: 12, fontWeight: 600,
  },
  deleteBtn: {
    padding: "5px 14px", border: "1px solid #fecaca", borderRadius: 6,
    background: "#fef2f2", color: "#dc2626", cursor: "pointer", fontSize: 12, fontWeight: 600,
  },
  overlay: {
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
    display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100,
  },
  modal: {
    background: "#fff", borderRadius: 14, padding: 28,
    width: "100%", maxWidth: 440, boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
  },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: 700, color: "#111827", margin: 0 },
  closeBtn: { background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#9ca3af" },
  field: { marginBottom: 14 },
  label: { display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 },
  input: {
    width: "100%", padding: "10px 12px", border: "1.5px solid #e5e7eb",
    borderRadius: 8, fontSize: 14, color: "#111827", outline: "none",
    boxSizing: "border-box", background: "#f9fafb",
  },
  modalActions: { display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20 },
  cancelBtn: {
    padding: "9px 18px", border: "1px solid #e5e7eb", borderRadius: 8,
    background: "#fff", cursor: "pointer", fontSize: 13, color: "#374151",
  },
  submitBtn: {
    padding: "9px 20px", background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
    color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: "pointer",
  },
  deleteConfirmBtn: {
    padding: "9px 20px", background: "#dc2626", color: "#fff",
    border: "none", borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: "pointer",
  },
};

export default Students;