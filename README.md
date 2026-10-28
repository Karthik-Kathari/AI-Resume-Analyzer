# AI Resume Analyzer

> Upload your resume PDF + paste a job description → get a match score, keyword gaps, and actionable suggestions instantly.

## 🚀 Live Demo
- **Frontend:** [Vercel URL here]
- **API:** [Render URL here]

## ✨ Features
- 📄 PDF resume upload with drag & drop
- 🤖 Rule-based keyword match engine (Gemini API ready — just add key)
- 📊 Match score ring, matched/missing keyword chips, suggestions
- 🔐 JWT auth (access token in memory + refresh token in httpOnly cookie)
- 📜 Full analysis history with delete
- 🐳 Docker ready

## 🛠 Tech Stack
| Layer | Tech |
|-------|------|
| Frontend | React, Vite, Tailwind CSS |
| Backend | Node.js, Express, TypeScript |
| Database | MongoDB Atlas |
| Auth | JWT (access + refresh tokens) |
| PDF | pdf-parse, Multer |
| Deploy | Vercel (FE) + Render (BE) |

## ⚡ Local Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas free cluster ([create here](https://cloud.mongodb.com))

### 1. Clone
```bash
git clone https://github.com/Karthik-Kathari/AI-Resume-Analyzer.git
cd AI-Resume-Analyzer
```

### 2. Server
```bash
cd server
cp .env.example .env
# Fill in MONGODB_URI and JWT secrets in .env
npm install
npm run dev
```

### 3. Client
```bash
cd client
npm install
npm run dev
```

Open http://localhost:5173

## 🔐 Environment Variables

### Server (`server/.env`)
| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_ACCESS_SECRET` | Min 32-char secret for access tokens |
| `JWT_REFRESH_SECRET` | Min 32-char secret for refresh tokens |
| `CLIENT_URL` | Frontend URL (for CORS) |
| `GEMINI_API_KEY` | Optional — activates AI analysis |

## 🤖 Enabling Gemini AI
1. Get a free key from [Google AI Studio](https://aistudio.google.com)
2. Add `GEMINI_API_KEY=your_key` to `server/.env`
3. Restart server — AI mode activates automatically

## 📁 Project Structure
```
AI-Resume-Analyzer/
├── client/          # React + Vite + Tailwind
└── server/          # Node + Express + TypeScript
```

## 📄 License
MIT
