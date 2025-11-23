import { useState } from "react";
import "./ChatBox.css";

const ChatBox = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    // hiện tin nhắn của user
    setMessages(prev => [...prev, { role: "user", text }]);
    setLoading(true);

    try {
      // gửi mess cho ai
      const aiRes = await fetch("http://localhost:5000/api/ai/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });
      // dữ liệu trả về
      const aiData = await aiRes.json();
      console.log("---",aiData);
      // 2. Lấy bác sĩ theo chuyên khoa
      const doctorRes = await fetch(
        `http://localhost:5000/api/doctors/doctorbyspe/dtc?specialty=${aiData.specialty}`
      );
      const doctors = await doctorRes.json();

      // Tạo tin nhắn trả về từ AI
      const reply = {
        specialty: aiData.specialty,
        advice: aiData.advice,
        doctors
      };

      setMessages(prev => [...prev, { role: "ai", reply }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: "ai", reply: { advice: "Có lỗi xảy ra. Vui lòng thử lại.", specialty: "", doctors: [] } }]);
    } finally {
      setLoading(false);
    }

  };

  return (<div className="chatbox-container">
    <button className="chatbox-button" onClick={() => setOpen(!open)}>
      {open ? "×" : "Chat"} </button>

    {
      open && (
        <div className="chatbox-panel">
          <div className="chatbox-header">AI dự đoán chuyên khoa và hỗ trợ đặt lịch</div>

          <div className="chatbox-messages">
            {messages.map((msg, i) =>
              msg.role === "user" ? (
                <p key={i}><b>Bạn:</b> {msg.text}</p>
              ) : (
                <div key={i}>
                  <p><b>AI:</b> {msg.reply.advice}</p>
                  {msg.reply.specialty && <p>👉 Bạn nên khám chuyên khoa: <b>{msg.reply.specialty}</b></p>}
                  {msg.reply.doctors && msg.reply.doctors.length > 0 && (
                    <>
                      <p><b>Bác sĩ phù hợp:</b></p>
                      {msg.reply.doctors.map(doc => (
                        <div key={doc.id} className="doctor-item">
                          <p>{doc.User.name} – {doc.Specialization.name}</p>
                          <button onClick={() => window.location.href = `/booking/${doc.userId}`}>Đặt lịch</button>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )
            )}
            {loading && <p><i>Đang xử lý...</i></p>}
          </div>

          <div className="chatbox-input-container">
            <input
              className="chatbox-input"
              type="text"
              placeholder="Mô tả triệu chứng của bạn..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage(inputText);
                  setInputText("");
                }
              }}
            />
            <button
              className="chatbox-send-button"
              onClick={() => {
                sendMessage(inputText);
                setInputText("");
              }}
              disabled={loading}
            >
              Gửi
            </button>
          </div>
        </div>
      )
    }
  </div >

  );
};

export default ChatBox;
