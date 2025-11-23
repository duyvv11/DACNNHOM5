import { useState ,useEffect } from "react";
import { toast } from "react-toastify";
import NewsManagement from "../../../components/admin/NewsManagement/NewsManagement";

const NewsManagementPage = () => {
  const [ newsList, setNewsList  ]=useState([]);
  const fetchDataNews = async()=>{
    const news = await fetch(`http://localhost:5000/api/news`);
    const data = await news.json();
    setNewsList(data);
  }
  useEffect(()=>{
    fetchDataNews()
  },[])
  const handleUpdate = async (id, dataUpdate) => {
    try {
      const res = await fetch(`http://localhost:5000/api/news/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataUpdate)
      });
      if (!res.ok) throw new Error("Cập nhật thất bại");
      const updated = await res.json();
      setNewsList(prev => prev.map(n => (n.id === id ? { ...n, ...updated } : n)));
      toast.success("Cập nhật thành công");
    } catch (err) {
      console.error(err);
      toast.error("Cập nhật thất bại");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/news/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Xóa thất bại");
      setNewsList(prev => prev.filter(n => n.id !== id));
      toast.success("Xóa thành công");
    } catch (err) {
      console.error(err);
      toast.error("Xóa thất bại");
    }
  };

  const handleAdd = async (newNews) => {
    try {
      const res = await fetch("http://localhost:5000/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNews)
      });
      const created = await res.json();
      setNewsList(prev => [...prev, created]);
      toast.success("Thêm thành công");
    } catch (err) {
      console.error(err);
      toast.error("Thêm thất bại");
    }
  };

  return (<NewsManagement
    newsList={newsList}
    onUpdate={handleUpdate}
    onDelete={handleDelete}
    onAdd={handleAdd}
  />
  );
};

export default NewsManagementPage;
