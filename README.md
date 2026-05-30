# 🏛️ ProcureAI — AI Procurement Automation Platform

**End-to-end AI for Indian Government Tendering** — a production-grade POC that demonstrates conversational RFP generation, multi-bidder evaluation, and GFR 2017 compliance using free AI APIs.

![Tech Stack](https://img.shields.io/badge/React-18-blue) ![AI](https://img.shields.io/badge/AI-Llama_4_Maverick-green) ![Cost](https://img.shields.io/badge/AI_Cost-₹0-brightgreen) ![Netlify](https://img.shields.io/badge/Deploy-Netlify-00C7B7)

---

## ✨ Features

### 1. Conversational RFP Generation
- Chat with AI to draft GeM-compliant tender documents
- Live preview panel with real-time RFP generation
- Auto-generates scoring matrix, eligibility criteria, MSME clauses
- Powered by Llama 4 Maverick via NVIDIA NIM (free)

### 2. Multi-Bidder Submission Portal
- 6-step wizard: Company → Documents → Technical → BoQ → EMD → Submit
- Document upload with verification checklist
- MSME registration handling
- Bid lock on submission

### 3. AI-Powered Bid Evaluation
- Automated technical scoring with evidence citations
- Page-level references from bid documents
- Financial evaluation with L1 determination
- Outlier pricing detection
- Interactive leaderboard with expandable evidence view

### 4. GFR 2017 Compliance Engine
- Automated rule-by-rule compliance checks
- MSME Order 2018 verification
- Make-in-India / DPIIT policy compliance
- RTI-ready audit trail

---

## 🏗️ Tech Stack

| Layer | Technology | Cost |
|-------|-----------|------|
| Frontend | React 18 + TypeScript + Tailwind CSS | Free |
| Routing | React Router v6 | Free |
| AI (LLM) | NVIDIA NIM — Llama 4 Maverick | **Free** |
| AI (Reasoning) | NVIDIA NIM — DeepSeek-R1 | **Free** |
| AI (Fallback) | Groq — Llama 4 Scout | **Free** |
| Serverless | Netlify Functions | Free tier |
| Hosting | Netlify | Free tier |
| Icons | Lucide React | Free |

**Total monthly cost: ₹0**

---

## 🚀 Deploy to Netlify (5 minutes)

### Option 1: One-click deploy

1. Fork this repo to your GitHub
2. Go to [app.netlify.com](https://app.netlify.com)
3. Click **"Add new site" → "Import an existing project"**
4. Connect your GitHub and select this repo
5. Build settings are auto-detected from `netlify.toml`
6. Add environment variables (see below)
7. Click **Deploy**

### Option 2: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
cd ai-procurement-poc
npm install
npm run build
netlify deploy --prod --dir=dist
```

### Environment Variables (set in Netlify dashboard)

Go to **Site settings → Environment variables** and add:

```
NVIDIA_API_KEY=nvapi-your-key-here
GROQ_API_KEY=gsk_your-key-here
```

### Getting Free API Keys

**NVIDIA NIM (recommended — 40+ RPM, no credit card):**
1. Go to [build.nvidia.com](https://build.nvidia.com)
2. Sign up for free NVIDIA Developer Program
3. Generate an API key (starts with `nvapi-`)
4. That's it — unlimited free usage

**Groq (fallback — 30 RPM, blazing fast):**
1. Go to [console.groq.com](https://console.groq.com)
2. Sign up with Google/GitHub
3. Generate an API key (starts with `gsk_`)
4. Free tier with no credit card

> **Note:** The app works even WITHOUT API keys — it falls back to intelligent mock responses that demonstrate the full UX flow. The AI features enhance the experience but aren't required for the demo.

---

## 📁 Project Structure

```
ai-procurement-poc/
├── netlify/
│   └── functions/
│       ├── chat.ts          # AI chat endpoint (NVIDIA NIM → Groq fallback)
│       └── evaluate.ts      # AI evaluation endpoint
├── src/
│   ├── components/
│   │   └── Layout.tsx       # Sidebar navigation layout
│   ├── pages/
│   │   ├── Dashboard.tsx    # Officer dashboard with stats & tenders
│   │   ├── CreateTender.tsx # Conversational RFP agent + live preview
│   │   ├── Evaluation.tsx   # Evaluation command center
│   │   └── BidSubmission.tsx# Multi-step bid submission wizard
│   ├── lib/
│   │   └── api.ts           # API client with fallback mock responses
│   ├── data/
│   │   └── mockData.ts      # Demo data + AI prompts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css            # Tailwind + custom styles
├── netlify.toml              # Netlify build config
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

---

## 🎯 For Recruiters

This project demonstrates:

- **Full-stack architecture** — React frontend + serverless backend + AI integration
- **AI/ML engineering** — LLM orchestration with provider failover (NVIDIA NIM → Groq)
- **Domain expertise** — Indian government procurement (GFR 2017, GeM, MSME)
- **Product thinking** — End-to-end user flow from RFP creation to bid evaluation
- **Cost optimization** — $0 AI infrastructure using free API tiers
- **Production patterns** — Error handling, loading states, responsive design, accessibility

### Key Technical Highlights

1. **Multi-provider AI failover** — If NVIDIA NIM is rate-limited, automatically falls back to Groq. If both fail, uses intelligent mock responses. Zero downtime.

2. **Serverless AI proxy** — Netlify Functions act as a secure proxy to AI APIs. API keys never exposed to the client.

3. **Conversational AI UX** — Split-panel chat + live preview for RFP generation. Real-time streaming feel with typing indicators.

4. **Evidence-based evaluation** — Every AI-generated score links to specific page numbers in bid documents. Fully auditable.

---

## 🛠️ Local Development

```bash
# Clone
git clone https://github.com/YOUR_USERNAME/ai-procurement-poc.git
cd ai-procurement-poc

# Install
npm install

# Create .env (optional — works without API keys too)
cp .env.example .env
# Add your NVIDIA_API_KEY and/or GROQ_API_KEY

# Run
npm run dev

# For Netlify Functions locally:
netlify dev
```

---

## 📜 License

MIT — use freely for your portfolio, interviews, or as a starting point for a real product.
