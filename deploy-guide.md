
# คู่มือการ Deploy (ย่อ)

## Frontend (Vercel)
```bash
cd frontend
npm install
npm run build
# or use `vercel` CLI
```

## Backend (Railway / Railway CLI)
```bash
cd backend
npm install
# set environment variables (.env)
npm start
```

### Environment variables (ตัวอย่าง)
```
NODE_ENV=production
PORT=3000
VITE_API_URL=https://your-backend.example.com
```
