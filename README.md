# SciSciNet Agent Frontend

Interactive frontend for the SciSciNet multi-agent LLM framework.

## Features

- Natural language query interface
- Interactive Vega-Lite visualizations
- Real-time chat with AI agents
- Responsive design with Tailwind CSS
- Built with Next.js 16 and React 19

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Configure environment:
```bash
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
```

3. Run development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Backend

Make sure the backend is running:
```bash
cd ../sciscinet-agent-backend
uv run uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload
```

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS
- **Visualization:** Vega-Lite, react-vega
- **Language:** TypeScript
- **Package Manager:** pnpm
