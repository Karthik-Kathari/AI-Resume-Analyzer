# ResumeIQ — ATS Resume Analyzer

Upload a resume PDF and a target job description to get an algorithmic match score, a breakdown of matched and missing skills, and actionable recommendations.

Built with React, Node.js/Express (TypeScript), and MongoDB Atlas. Features a **zero-cost-first architecture**: the core application operates entirely on an in-memory rule-based keyword matching engine with zero required third-party AI APIs or costs. Optional AI enhancement via Google Gemini can be toggled on server-side without altering client workflows or requiring user API keys.

---

## Key Features

- **Zero-Cost Rule-Based Matching:** Normalized tokenization with smart punctuation preservation (`Node.js`, `C++`, `React.js`, `.NET`, `CI/CD`), extensive English and job-filler stop-word filtering, and tech taxonomy matching.
- **Transparent Scoring & Methodology:** Displays exact mathematical match ratios `(Matched Skills ÷ Required Skills) × 100` alongside an explicit scoring limitation disclaimer.
- **Optional Server-Side AI Enhancement:** Can be toggled on with `ENABLE_AI_ENHANCEMENT=true` and a Gemini API key. Falls back to the rule-based engine automatically on missing keys, errors, or rate limits.
- **Secure Authentication:** JWT authentication with access tokens stored in memory and refresh tokens stored in secure `httpOnly` cookies. Passwords hashed with `bcryptjs`.
- **Data Isolation:** Enforces strict user ownership across all analysis and history endpoints.
- **PDF Extraction:** Memory-buffered parsing via `multer` and `pdf-parse` without persisting raw files to disk.

---

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Axios
- **Backend:** Node.js, Express, TypeScript, Zod
- **Database:** MongoDB Atlas (M0 Free Tier)
- **Auth:** JWT (Access + Refresh Token rotation), bcryptjs
- **Parsing:** Multer, pdf-parse

---

## Local Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas free cluster

### 1. Clone the repository
```bash
git clone https://github.com/Karthik-Kathari/AI-Resume-Analyzer.git
cd AI-Resume-Analyzer
```

### 2. Configure & run backend
```bash
cd server
cp .env.example .env
npm install
npm run dev
```

### 3. Configure & run frontend
```bash
cd ../client
npm install
npm run dev
```

Access the client at `http://localhost:5173`.

---

## Environment Variables

### Backend (`server/.env`)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/resume-analyzer?retryWrites=true&w=majority
JWT_ACCESS_SECRET=your_access_token_secret_min_32_chars
JWT_REFRESH_SECRET=your_refresh_token_secret_min_32_chars
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173

# Optional AI Enhancement (Default: disabled, ₹0 cost)
ENABLE_AI_ENHANCEMENT=false
GEMINI_API_KEY=
```

### Frontend (`client/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## Scoring Methodology & Limitations

ResumeIQ calculates technical keyword alignment based on extracted terms from both the uploaded resume and the job description. The score is a preparation diagnostic and does not claim or guarantee actual candidate selection or ATS passage by specific corporate employers.

---

## License

MIT
