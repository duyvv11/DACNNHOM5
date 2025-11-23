require('dotenv').config();
const OpenAI = require("openai");

console.log("OPENAI KEY:", process.env.OPENAI_KEY); // kiểm tra key

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

exports.diagnose = async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `
        Bạn là trợ lý y tế. Chỉ trả về JSON hợp lệ dạng:
        {
          "specialty":"<TÊN CHUYÊN KHOA>",
          "reason":"<LÝ DO>",
          "advice":"<LỜI KHUYÊN>"
        }

        - Luôn chọn DUY NHẤT 1 chuyên khoa từ danh sách:
        [Khoa Nhi, Khoa Nội Tổng Quát, Khoa Tim Mạch, Khoa Thần Kinh, Da Liễu, Tai Mũi Họng, Răng Hàm Mặt, Cơ Xương Khớp, Tiêu Hóa, Ngoại Tổng Quát].

        - Không được trả thêm chữ hoặc câu bên ngoài JSON.
      `
        },
        { role: "user", content: message }
      ]
    });

    const raw = completion.choices[0].message.content.trim();
    const result = JSON.parse(raw);

    res.json(result);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI error", detail: error.message });
  }
};
