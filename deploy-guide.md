# คู่มือการ Deploy - Viral Videos Tracker

## 📋 Prerequisites
- บัญชี Vercel (Frontend)
- บัญชี Railway (Backend) 
- GitHub repository

## 🚀 1. Deploy Frontend บน Vercel

### วิธีที่ 1: ผ่าน Vercel CLI
```bash
# ติดตั้ง Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from frontend directory
cd frontend
vercel --prod
```

### วิธีที่ 2: ผ่าน GitHub Integration
1. Push code ไปยัง GitHub
2. ไปที่ [vercel.com](https://vercel.com)
3. คลิก "New Project"
4. เลือก repository ของคุณ
5. ตั้งค่า Root Directory เป็น `frontend`
6. คลิก "Deploy"

### Environment Variables (Frontend)
เพิ่ม environment variable ใน Vercel:
```env
VITE_API_URL=https://your-backend-url.railway.app
```

## 🔧 2. Deploy Backend บน Railway

### วิธีที่ 1: ผ่าน Railway CLI
```bash
# ติดตั้ง Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Deploy from backend directory
cd backend
railway up
```

### วิธีที่ 2: ผ่าน GitHub Integration
1. ไปที่ [railway.app](https://railway.app)
2. คลิก "New Project"
3. เลือก "Deploy from GitHub repo"
4. เลือก repository ของคุณ
5. ตั้งค่า Root Directory เป็น `backend`

### Environment Variables (Backend)
เพิ่ม environment variables ใน Railway:
```env
NODE_ENV=production
PORT=3000
LOG_LEVEL=info
```

## 🌐 3. ตั้งค่า Domain และ CORS

### CORS Configuration
ใน `backend/server.js` ตั้งค่า CORS สำหรับ production:
```javascript
app.use(cors({
  origin: [
    'https://your-frontend-domain.vercel.app',
    'http://localhost:5173'
  ],
  credentials: true
}));
```

### Custom Domain (Optional)
**Vercel:**
1. ไปที่ Project Settings > Domains
2. เพิ่ม domain ของคุณ

**Railway:**
1. ไปที่ Project > Settings > Networking
2. เพิ่ม custom domain

## 📊 4. Monitoring และ Logs

### Vercel Analytics
- ไปที่ Vercel Dashboard > Analytics
- ดู performance และ traffic

### Railway Logs
```bash
railway logs
```

## 🔒 5. Security Settings

### Rate Limiting
production rate limit settings:
```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
```

### Environment Protection
- อย่า commit `.env` files
- ใช้ environment variables ใน platform
- ใช้ strong passwords

## 🐛 6. Troubleshooting

### Common Issues

**Frontend ไม่สามารถเชื่อมต่อกับ Backend**
- ตรวจสอบ `VITE_API_URL` environment variable
- ตรวจสอบ CORS settings

**Scraping ไม่ทำงาน**
- ตรวจสอบว่า Puppeteer สามารถทำงานใน production ได้
- ตรวจสอบ logs สำหรับ error messages

**Memory Issues**
- ตั้งค่า memory limit ใน Railway
- ตรวจสอบว่า browser instances ถูกปิดอย่างเหมาะสม

### Debug Commands
```bash
# Check backend health
curl https://your-backend-url.railway.app/api/health

# Check frontend build
cd frontend && npm run build

# Check logs
railway logs --tail
```

## 📈 7. Performance Optimization

### Frontend
- ใช้ React.lazy() สำหรับ code splitting
-  optimize images
- ใช้ CDN สำหรับ static assets

### Backend  
- ใช้ caching สำหรับ scraping results
- ตั้งค่า appropriate timeouts
- ใช้ connection pooling

## 🔄 8. Continuous Deployment

### GitHub Actions (Optional)
สร้าง `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: cd backend && railway up

  deploy-frontend:
    runs-on: ubuntu-latest  
    steps:
      - uses: actions/checkout@v2
      - run: cd frontend && vercel --prod --token=$VERCEL_TOKEN
    env:
      VERCEL_TOKEN: \\${{ secrets.VERCEL_TOKEN }}
```

## 💰 9. Cost Management

### Vercel
- Hobby plan: ฟรี
- Pro plan: $20/เดือน

### Railway
- Starter plan: ฟรี (usage limits)
- Standard plan: $5/เดือน

ตรวจสอบ usage อย่างสม่ำเสมอเพื่อป้องกัน unexpected charges

---

**หมายเหตุ**: คู่มือนี้ assume ว่าคุณมี basic knowledge เกี่ยวกับ deployment platforms ที่ใช้
