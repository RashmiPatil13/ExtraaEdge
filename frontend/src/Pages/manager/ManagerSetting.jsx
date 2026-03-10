import { useEffect, useState } from "react";
import api from "../utils/api";

export default function ManagerSetting() {
  const [notifications, setNotifications] = useState([]);
  const [telecallers, setTelecallers] = useState([]);
  const [reply, setReply] = useState("");
  const [sendTo, setSendTo] = useState("admin");

  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications");
      const latest = res.data.slice(0, 3);
      setNotifications(latest);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTelecallers = async () => {
    try {
      const res = await api.get("/manager/telecallers");
      setTelecallers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    fetchTelecallers();
  }, []);

  const sendMessage = async () => {
    if (!reply.trim()) return alert("Enter message");

    try {
      await api.post("/messages/send", {
        message: reply,
        role: sendTo === "admin" ? "admin" : "telecaller",
        userId: sendTo === "admin" ? null : sendTo,
      });

      setReply("");
      alert("Message sent");

      fetchNotifications();
    } catch (err) {
      console.log(err);
    }
  };
  const deleteMessage = async (id) => {
    try {
      await api.delete(`/notifications/${id}`);

      fetchNotifications();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="settings">
      <h2>💬 Messages</h2>

      <div className="messages-container">
        {notifications.length === 0 ? (
          <p>No messages</p>
        ) : (
          notifications.map((n) => (
            <div key={n._id} className="message-card">
              {/* <div className="message-header">
                <strong>{n.senderName || "Admin"}</strong>
                <span>{new Date(n.createdAt).toLocaleString()}</span>
              </div> */}
              <div className="message-header">
                <strong>{n.senderName || "Admin"}</strong>

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

              <p className="message-text">{n.message}</p>
            </div>
          ))
        )}
      </div>

      <div className="reply-box">
        <h3>Send Message</h3>

        <select value={sendTo} onChange={(e) => setSendTo(e.target.value)}>
          <option value="admin">Send to Admin</option>

          {telecallers.map((t) => (
            <option key={t._id} value={t._id}>
              {t.name}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Type your message..."
          value={reply}
          onChange={(e) => setReply(e.target.value)}
        />

        <button onClick={sendMessage}>Send Message</button>
      </div>
    </div>
  );
}
// {notifications.map((n)=>(
//     <div className="notification">
//     <p>{n.message}</p>
//     <span>{new Date(n.createdAt).toLocaleString()}</span>
//     </div>
//     ))}
