# Viral Videos Tracker 🌍

เว็บแอพสำหรับติดตามวิดีโอที่กำลังเป็นไวรัลจาก 4 ภูมิภาค

## 🚀 ฟีเจอร์
- 📊 ติดตามเทรนด์วิดีโอจาก Global, USA, China, Thailand
- 🎯 Web scraping โดยไม่ใช้ API
- 📱 Responsive design
- 🔄 Real-time updates
- 🏷️ แสดง hashtags ที่เกี่ยวข้อง

## 🛠️ เทคโนโลยี
- **Frontend**: React, CSS3, Vite
- **Backend**: Node.js, Express
- **Scraping**: Puppeteer, Cheerio
- **Deployment**: Vercel, Railway

## 📦 การติดตั้ง

### Prerequisites
- Node.js 18.0.0 ขึ้นไป
- npm หรือ yarn

### Backend
\\`\\`\\`bash
cd backend
npm install
npm start
\\`\\`\\`

### Frontend
\\`\\`\\`bash
cd frontend
npm install
npm run dev
\\`\\`\\`

## 🏗️ โครงสร้างโปรเจ็ค
\\`\\`\\`
viral-videos-tracker/
├── backend/           # Node.js API server
│   ├── services/     # Scraping services
│   ├── utils/        # Helper functions
│   └── config/       # Configuration
├── frontend/         # React application
│   ├── src/components/
│   └── public/
├── README.md         # ไฟล์นี้
└── .gitignore        # Git ignore rules
\\`\\`\\`

## 📡 API Endpoints

### Health Check
\\`\\`\\`http
GET /api/health
\\`\\`\\`

### ดึงวิดีโอทั้งหมด
\\`\\`\\`http
GET /api/videos?region=global&limit=10
\\`\\`\\`

### ดึงวิดีโอตามภูมิภาค
\\`\\`\\`http
GET /api/videos/:region?limit=10
\\`\\`\\`

**Parameters:**
- \\`region\\`: global, usa, china, thailand
- \\`limit\\`: จำนวนวิดีโอ (default: 10)

## 🎯 ภูมิภาคที่รองรับ
- 🌍 **Global** - วิดีโอยอดนิยมระดับโลก
- 🇺🇸 **USA** - เทรนด์จากสหรัฐอเมริกา  
- 🇨🇳 **China** - ไวรัลจากจีน (Douyin)
- 🇹🇭 **Thailand** - วิดีโอยอดนิยมในไทย

## 🎨 ตัวอย่าง Response
\\`\\`\\`json
{
  "success": true,
  "count": 5,
  "region": "global",
  "videos": [
    {
      "id": "youtube_global_123456",
      "title": "Viral Dance Challenge #Shorts",
      "link": "https://youtube.com/watch?v=abc123",
      "screenshot": "https://...",
      "region": "global",
      "platform": "youtube",
      "hashtags": ["#Shorts", "#Dance"],
      "views": 2500000,
      "timestamp": "2023-10-01T10:00:00Z"
    }
  ]
}
\\`\\`\\`

## 🔧 Environment Variables

### Backend (.env)
\\`\\`\\`env
NODE_ENV=production
PORT=3000
LOG_LEVEL=info
\\`\\`\\`

### Frontend (.env)
\\`\\`\\`env
VITE_API_URL=http://localhost:3000
\\`\\`\\`

## 🚀 Deployment

### Frontend (Vercel)
\\`\\`\\`bash
npm install -g vercel
cd frontend
vercel --prod
\\`\\`\\`

### Backend (Railway)
\\`\\`\\`bash
npm install -g @railway/cli
cd backend
railway up
\\`\\`\\`

## ⚠️ ข้อควรระวัง
- แอพนี้ใช้สำหรับการศึกษาเท่านั้น
- ตรวจสอบ ToS ของแต่ละแพลตฟอร์มก่อนใช้งานจริง
- ใช้ rate limiting เพื่อไม่ให้ถูกบล็อก
- เคารพกฎหมายลิขสิทธิ์

## 🤝 การมีส่วนร่วม
1. Fork the project
2. Create your feature branch (\\`git checkout -b feature/AmazingFeature\\`)
3. Commit your changes (\\`git commit -m 'Add some AmazingFeature'\\`)
4. Push to the branch (\\`git push origin feature/AmazingFeature\\`)
5. Open a Pull Request

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributors
- Your Name (@yourusername)

## 📞 Support
หากมีคำถามหรือปัญหา สามารถเปิด issue ได้ที่ [GitHub Issues](https://github.com/yourusername/viral-videos-tracker/issues)

---

**Built with ❤️ for tracking viral video trends**
