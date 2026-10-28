# AI Resume Analyzer

Upload a resume (PDF) and a job description — get back a match score, missing keywords, and suggestions on what to improve.

Built with React, Node/Express (TypeScript), and MongoDB. Auth uses JWT with access tokens stored in memory and refresh tokens in httpOnly cookies. The analyzer is rule-based by default and switches to Gemini API automatically when a key is provided.

**Live demo:** coming soon

---

## Stack

- **Frontend** — React, Vite, Tailwind CSS
- **Backend** — Node.js, Express, TypeScript
- **Database** — MongoDB Atlas
- **Auth** — JWT (access + refresh token rotation)
- **PDF parsing** — Multer + pdf-parse

---

## Getting Started

You need Node.js 18+ and a [MongoDB Atlas](https://cloud.mongodb.com) free cluster.

```bash
git clone https://github.com/Karthik-Kathari/AI-Resume-Analyzer.git
cd AI-Resume-Analyzer
```

**Server**

```bash
cd server
cp .env.example .env   # fill in the values (see below)
npm install
npm run dev            # runs on http://localhost:5000
```

**Client**

```bash
cd client
npm install
npm run dev            # runs on http://localhost:5173
```

---

## Environment Variables

Copy `server/.env.example` to `server/.env` and fill in:

```env
MONGODB_URI=           # your Atlas connection string
JWT_ACCESS_SECRET=     # any random string, min 32 chars
JWT_REFRESH_SECRET=    # different random string, min 32 chars
CLIENT_URL=http://localhost:5173
GEMINI_API_KEY=        # optional — leave blank to use rule-based mode
```

To generate strong secrets quickly:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Gemini AI Mode

The analyzer works out of the box without any API key using a rule-based keyword matching engine. To enable AI-powered analysis, get a free key from [Google AI Studio](https://aistudio.google.com), add it to `.env`, and restart the server. No code changes needed — the server detects the key and switches modes automatically.

---

## Project Structure

```
AI-Resume-Analyzer/
├── client/            React frontend
│   └── src/
│       ├── api/       axios instance + API helpers
│       ├── components/
│       ├── context/   AuthContext (JWT handling)
│       └── pages/
└── server/            Node/Express backend
    └── src/
        ├── config/    DB connection, env validation
        ├── controllers/
        ├── middleware/ JWT auth, file upload
        ├── models/    User, Analysis (Mongoose)
        ├── routes/
        ├── services/  analyzer engine, Gemini stub
        └── utils/     token helpers, PDF parser
```

---

## License

MIT
