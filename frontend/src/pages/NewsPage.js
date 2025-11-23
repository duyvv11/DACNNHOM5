import { useState, useEffect } from "react";
import "./NewsPage.css";

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/news/");
        const data = await response.json();
        // chuẩn hóa về mảng
        setNews(Array.isArray(data) ? data : [data]);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const filteredNews = news.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.content.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <div className="news-page">
      <h1 className="news-title">Tin Tức Y Tế</h1>

      <input
        type="text"
        placeholder="Tìm kiếm bài viết..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="news-search"
      />

      <div className="news-list">
        {filteredNews.length === 0 ? (
          <p>Không tìm thấy bài viết nào.</p>
        ) : (
          filteredNews.map((item) => (
            <div key={item.id} className="news-item">
              <h2>{item.title}</h2>
              <p>{item.content}</p>
              <p>
                <strong>Từ khóa triệu chứng:</strong> {item.symptom_keywords}
              </p>
              <p>
                <strong>Chuyên khoa gợi ý:</strong> {item.suggested_specialization}
              </p>
              <p className="news-date">
                Cập nhật: {new Date(item.updatedAt).toLocaleString("vi-VN")}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );

};

export default NewsPage;
