import { useState } from "react";

const NewsManagement = ({ newsList, onUpdate, onDelete, onAdd }) => {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [newNews, setNewNews] = useState({
    title: "",
    content: "",
    symptom_keywords: "",
    suggested_specialization: ""
  });

  // Bắt đầu sửa
  const startEdit = (news) => {
    setEditingId(news.id);
    setEditData({
      title: news.title,
      content: news.content,
      symptom_keywords: news.symptom_keywords,
      suggested_specialization: news.suggested_specialization
    });
  };

  // Lưu sửa
  const handleSave = (id) => {
    onUpdate(id, editData);
    setEditingId(null);
  };

  // Thêm mới
  const handleAdd = () => {
    onAdd(newNews);
    setNewNews({ title: "", content: "", symptom_keywords: "", suggested_specialization: "" });
  };

  return (<div className="Table-AdminManagement"> <h3>Thêm Tin Tức Mới</h3>
    <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginBottom: "10px" }}>
      <input placeholder="Tiêu đề" value={newNews.title} onChange={e => setNewNews({ ...newNews, title: e.target.value })} />
      <input placeholder="Nội dung" value={newNews.content} onChange={e => setNewNews({ ...newNews, content: e.target.value })} />
      <input placeholder="Từ khóa triệu chứng" value={newNews.symptom_keywords} onChange={e => setNewNews({ ...newNews, symptom_keywords: e.target.value })} />
      <input placeholder="Chuyên khoa gợi ý" value={newNews.suggested_specialization} onChange={e => setNewNews({ ...newNews, suggested_specialization: e.target.value })} /> <button onClick={handleAdd}>Thêm</button> </div>
    <table>
      <thead>
        <tr>
          <td>Tiêu đề</td>
          <td>Nội dung</td>
          <td>Từ khóa triệu chứng</td>
          <td>Chuyên khoa gợi ý</td>
          <td>Quản lý</td>
        </tr>
      </thead>
      <tbody>
        {newsList.map(news => (
          <tr key={news.id}>
            {editingId === news.id ? (
              <>
                <td><input value={editData.title} onChange={e => setEditData({ ...editData, title: e.target.value })} /></td>
                <td><input value={editData.content} onChange={e => setEditData({ ...editData, content: e.target.value })} /></td>
                <td><input value={editData.symptom_keywords} onChange={e => setEditData({ ...editData, symptom_keywords: e.target.value })} /></td>
                <td><input value={editData.suggested_specialization} onChange={e => setEditData({ ...editData, suggested_specialization: e.target.value })} /></td>
                <td>
                  <button onClick={() => handleSave(news.id)}>Lưu</button>
                  <button onClick={() => setEditingId(null)}>Hủy</button>
                </td>
              </>
            ) : (
              <>
                <td>{news.title}</td>
                <td>{news.content}</td>
                <td>{news.symptom_keywords}</td>
                <td>{news.suggested_specialization}</td>
                <td>
                  <button onClick={() => startEdit(news)}>Sửa</button>
                  <button onClick={() => onDelete(news.id)}>Xóa</button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
};

export default NewsManagement;
