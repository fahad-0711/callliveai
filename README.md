# CallLiveAI — Voice CRM for Real Estate

A premium SaaS dashboard for real estate agencies powered by an AI voice calling agent.

## 🚀 Live Demo

[https://your-github-username.github.io/callliveai/](https://your-github-username.github.io/callliveai/)

## ✨ Features

- **AI Voice Agent** — Automated calling with real-time status tracking
- **Lead Management** — Grid/list views, filtering, detailed lead profiles
- **Sales Pipeline** — Drag-and-drop Kanban board with 5 stages
- **Activity Tracking** — AI call logs with sentiment analysis
- **Dashboard** — KPI cards, charts, agent leaderboard, and analytics
- **Space Theme** — Immersive galaxy background with stars, nebulae, and shooting stars

## 🛠️ Tech Stack

- React 19 + Vite
- Tailwind CSS v4
- Recharts (data visualization)
- @hello-pangea/dnd (drag-and-drop)
- Lucide React (icons)
- date-fns (date formatting)

## 📦 Getting Started

```bash
npm install
npm run dev
```

## 🚀 Deploy to GitHub Pages

```bash
npm run deploy
```

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/     # Sidebar, Topbar, Layout
│   └── ui/         # Modal, Toast, StatCard
├── pages/          # Dashboard, Leads, Pipeline, Activities, etc.
├── data/           # Mock data
├── hooks/          # useCounter, useToast, useModal
├── utils/          # formatCurrency, formatDate
├── SpaceBackground.jsx
└── App.jsx
```

## License

MIT
