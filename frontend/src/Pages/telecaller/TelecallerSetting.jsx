import { useEffect, useState } from "react";
import api from "../utils/api";
import "./telecaller.css";
import { toast } from "react-toastify";

export default function TelecallerSetting() {
  const [sendRole, setSendRole] = useState("admin");
  const [sendType, setSendType] = useState("all");
  const [managers, setManagers] = useState([]);
  const [selectedManager, setSelectedManager] = useState("");
  const [message, setMessage] = useState("");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchManagers();
    fetchMessages();
  }, []);

  const fetchManagers = async () => {
    const res = await api.get("/managers");
    setManagers(res.data);
  };

  const fetchMessages = async () => {
    const res = await api.get("/notifications");
    setNotifications(res.data);
  };

  const sendMessage = async () => {
    if (!message.trim()) return alert("Enter message");
    try {
      await api.post("/messages/send", {
        message,
        role: sendRole,
        userId: sendType === "one" ? selectedManager : null,
      });

      // alert("Message sent successfully");
      toast.success("Message sent successfully");
      setMessage("");
      fetchMessages();
    } catch (err) {
      console.log(err);
      // alert("Failed to send message");
      toast.error("Failed to send message");
    }
  };
  const deleteMessage = async (id) => {
    await api.delete(`/notifications/${id}`);
    fetchMessages();
  };

  return (
    <div className="tele-settings-container">
      <div className="tele-card">
        <h2>💬 Messages</h2>

        {/* SEND MESSAGE SECTION */}

        <div className="send-box">
          <label>Send To Role</label>

          <select
            value={sendRole}
            onChange={(e) => setSendRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
          </select>

          {sendRole === "manager" && (
            <>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    checked={sendType === "all"}
                    onChange={() => setSendType("all")}
                  />
                  All Managers
                </label>

                <label>
                  <input
                    type="radio"
                    checked={sendType === "one"}
                    onChange={() => setSendType("one")}
                  />
                  Select One
                </label>
              </div>

              {sendType === "one" && (
                <select
                  value={selectedManager}
                  onChange={(e) => setSelectedManager(e.target.value)}
                >
                  <option value="">Select Manager</option>

                  {managers.map((m) => (
                    <option key={m._id} value={m._id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              )}
            </>
          )}

          <textarea
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button onClick={sendMessage}>Send Message</button>
        </div>

        {/* MESSAGE LIST */}

        <div className="message-list">
          {notifications.map((n) => (
            <div key={n._id} className="message-card">
              <div className="msg-header">
                <strong>{n.senderName}</strong>

                <span>{new Date(n.createdAt).toLocaleString()}</span>

                <button
                  className="delete-btn"
                  onClick={() => deleteMessage(n._id)}
                >
                  🗑
                </button>
              </div>

              <p>{n.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
