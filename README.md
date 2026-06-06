# PortfolioPilot 🚀

PortfolioPilot is an AI-powered portfolio reviewer that helps students and early-career developers improve their portfolios through instant, actionable feedback.

Users simply paste their portfolio URL, and the system analyzes the website content using an LLM to generate a portfolio score, strengths, and improvement suggestions.

---

## 📌 Problem Statement

Many students and junior developers struggle to understand how recruiters perceive their portfolios. Getting professional feedback is often difficult, time-consuming, or expensive.

PortfolioPilot solves this problem by providing automated AI-driven portfolio reviews in seconds.

---

## ✨ Features

- 🔗 Portfolio URL Analysis
- 🤖 AI-Powered Portfolio Review
- 📊 Portfolio Scoring
- 💪 Strength Identification
- 📈 Improvement Suggestions
- ⚡ Fast and User-Friendly Interface

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- CSS

### Backend
- Node.js
- Express.js

### AI & Processing
- Groq API
- Llama 3.3 70B Versatile
- Axios
- Cheerio

---

## ⚙️ How It Works

1. User enters a portfolio URL.
2. Backend fetches the website content using Axios.
3. Cheerio extracts meaningful text and headings.
4. Extracted content is sent to the LLM via the Groq API.
5. The AI generates:
   - Portfolio Score
   - Strengths
   - Improvement Suggestions
6. Results are displayed on the frontend.

---

## 🏗️ System Architecture

```text
User
  │
  ▼
React Frontend
  │
  ▼
Express Backend
  │
  ▼
Axios Website Scraper
  │
  ▼
Cheerio Content Extraction
  │
  ▼
Groq API (Llama 3.3)
  │
  ▼
JSON Review Response
  │
  ▼
Frontend Results Display
```

---

## 🚀 Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/PortfolioPilot.git
cd PortfolioPilot
```

### Frontend Setup

```bash
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
npm install
node server.js
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `backend` directory:

```env
GROQ_API_KEY=your_api_key_here
```

---

## 📷 Example Workflow

1. Enter a portfolio URL.
2. Click **Analyze**.
3. AI reviews the portfolio.
4. Receive:
   - Overall Score
   - Key Strengths
   - Areas for Improvement

---

## 🔮 Future Improvements

- Multi-page Portfolio Analysis
- Resume Upload Support
- SEO Analysis
- Accessibility Evaluation
- Design Consistency Scoring
- Personalized Improvement Roadmap

---

## 👨‍💻 Author

**Nandhana Rajendran**

B.Tech Computer Science & Engineering  
Government Engineering College Idukki

---

## 📄 License

This project was developed as part of the **QuAnHack Internship Final Round – AI Workflow Challenge**.