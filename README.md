# ChainSight AI

AI-powered DeFi risk, yield & bridge analytics  
Live insights into Uniswap V3 pools + optimized LI.FI routes

🌍 **Live Demo:** https://chainsight-ai-rho.vercel.app/  
📦 **Source Code:** https://github.com/arnavsriva/chainsight-ai

---

## 🚀 What it does

ChainSight AI helps DeFi users and liquidity providers make smarter decisions by:

- 💧 Fetching live Uniswap V3 pool metrics (liquidity, fee tier, tick, price state)
- 🔀 Fetching real routing quotes from LI.FI (fees, gas, ETA)
- 🤖 Generating AI-powered summaries with actionable risk & strategy insights
- 📊 Presenting everything in a clean, trader-friendly dashboard

---

## 🧠 Live Features

### 📈 Uniswap Pool Analyzer
Shows real on-chain Uniswap V3 data with contextual AI insights.

- Liquidity amounts
- Current tick and price
- AI summary: risk level, LP guidance, trader notes

### 🔁 LI.FI Route Optimizer
Shows the best bridging route with:

- Estimated time
- Gas and fee cost
- Slippage
- From/To chains & tokens

---

## 🛠 Tech Stack

- **Frontend:** Next.js + TypeScript + Tailwind CSS
- **Blockchain Data:** Uniswap V3 on-chain RPC
- **Routing:** LI.FI public quote API
- **AI Summaries:** LLM via HuggingFace HF Router
- **Deployment:** Vercel

---

## 🔧 Local Development

Clone the repo:

```bash
git clone https://github.com/arnavsriva/chainsight-ai
cd chainsight-ai/frontend
npm install
