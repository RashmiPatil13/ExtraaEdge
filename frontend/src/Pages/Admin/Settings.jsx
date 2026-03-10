import { useEffect, useState } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";

export default function Settings() {
  const [role, setRole] = useState("manager");
  const [users, setUsers] = useState([]);
  const [sendType, setSendType] = useState("all");
  const [selectedUser, setSelectedUser] = useState("");
  const [message, setMessage] = useState("");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchNotifications();
  }, [role]);

  const fetchUsers = async () => {
    try {
      const res = await api.get(`/admin/users/${role}`);
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const sendNotification = async () => {
    try {
      await api.post("/admin/send-notification", {
        message,
        role,
        userId: sendType === "one" ? selectedUser : null,
      });

      //   alert("Notification Sent!");
      toast.success("Notification Sent Successfully!");
      setMessage("");
      setSelectedUser("");
    } catch (err) {
      //   alert("Failed to send");
      toast.error("Failed to send notification");
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications");
      setNotifications(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteMessage = async (id) => {
    try {
      await api.delete(`/notifications/${id}`);

      toast.success("Message deleted");

      fetchNotifications(); // refresh messages
    } catch (err) {
      console.log(err);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="settings-container">
      <h2>🔔 Notifications</h2>

      {/* ROLE DROPDOWN */}
      <label>Role</label>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="manager">Manager</option>
        <option value="telecaller">Telecaller</option>
      </select>

      {/* SEND TYPE */}
      <label>Send To</label>
      <div className="radio-group">
        <label>
          <input
            type="radio"
            value="all"
            checked={sendType === "all"}
            onChange={() => setSendType("all")}
          />
          All {role}s
        </label>

        <label>
          <input
            type="radio"
            value="one"
            checked={sendType === "one"}
            onChange={() => setSendType("one")}
          />
          Select One
        </label>
      </div>

      {/* USER DROPDOWN */}
      {sendType === "one" && (
        <>
          <label>Select {role}</label>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">-- Select --</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name}
              </option>
            ))}
          </select>
        </>
      )}

      {/* MESSAGE */}
      <label>Message</label>
      <textarea
        placeholder="Type your notification message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendNotification}>Send Notification</button>

      <h3 style={{ marginTop: "30px" }}>💬 Messages</h3>

      <div className="messages-container">
        {notifications.length === 0 ? (
          <p>No messages</p>
        ) : (
          notifications.map((n) => (
            <div key={n._id} className="message-card">
              <div className="message-header">
                <strong>{n.senderName || "User"}</strong>

                <div className="msg-right">
                  <span>{new Date(n.createdAt).toLocaleString()}</span>

                  <button
                    className="delete-btn"
                    onClick={() => deleteMessage(n._id)}
                  >
                    🗑
                  </button>
                </div>
              </div>

              <p>{n.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
