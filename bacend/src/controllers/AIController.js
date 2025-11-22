require('dotenv').config();
const OpenAI = require("openai");

console.log("OPENAI KEY:", process.env.OPENAI_KEY); // kiểm tra key

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

exports.diagnose = async (req, res) => {
  console.log("rq send");
  try {
    const { message } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Bạn là trợ lý y tế. Nhiệm vụ:
                1. Phân tích triệu chứng.
                2. CHỌN DUY NHẤT 1 chuyên khoa phù hợp từ danh sách sau: [Khoa nhi, Khoa tổng quát, Khoa tim mạch, Da liễu, Răng Hàm Mặt,...].
                3. TRẢ VỀ JSON hợp lệ: { "specialty":"<TÊN CHUYÊN KHOA CHÍNH XÁC>", "reason":"", "advice":"" }`
        },
        { role: "user", content: message }
      ],
    });

    const raw = completion.choices[0].message.content.trim();
    const result = JSON.parse(raw);

    res.json(result);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI error", detail: error.message });
  }
};
