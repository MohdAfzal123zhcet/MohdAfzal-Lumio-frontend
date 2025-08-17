<img width="1920" height="1080" alt="Screenshot (153)" src="https://github.com/user-attachments/assets/f64c6f49-6fa4-4321-953c-96c364957648" />



---

# 📌 Frontend README (React + Vite)

```markdown
# Meeting Summarizer Frontend

A React + Vite frontend for the Meeting Summarizer app.  
Features:
- Upload meeting transcripts
- Request summaries from backend (Groq API)
- Send summaries via email
- Modern UI with Vite

---

## 🚀 Tech Stack
- React 18
- Vite
- Axios / Fetch
- Docker
- Railway (deployment)

---

## ⚙️ Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/meeting-summarizer-frontend.git
cd meeting-summarizer-frontend

2. Environment Variables

Create a .env file in the frontend root:

VITE_API_URL=http://localhost:8080


For production (Railway), set VITE_API_URL to your backend URL, e.g.:

VITE_API_URL=https://your-backend-production.up.railway.app

3. Run locally
npm install
npm run dev


App runs on 👉 http://localhost:5173





Docker
Build & run
docker build -t meeting-summarizer-frontend .
docker run -p 5173:80 --env-file .env meeting-summarizer-frontend

🔗 Connect to Backend

Make sure your backend is running and that the VITE_API_URL points to it.

Example:

Backend → http://localhost:8080

Frontend → http://localhost:5173

🚀 Deployment

On Railway:

Deploy frontend as static site (Docker or Railway buildpack)

Set VITE_API_URL = your deployed backend URL








# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
