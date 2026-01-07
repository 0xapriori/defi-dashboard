# DeFi Protocol Intelligence Dashboard

A comprehensive, interactive dashboard displaying DeFi protocol metrics across multiple blockchain networks including Ethereum, Solana, BSC, Base, Arbitrum, and more.

## Features

- **Overview Tab**: Key metrics, TVL distribution by chain, TVL by category, top 10 protocols
- **All Protocols Tab**: 50+ protocols organized by chain with TVL, fees, and highlights
- **Volume & Users Tab**: Trading volume comparisons, volume breakdown tables, active user charts
- **Fees & Revenue Tab**: 30-day fees vs revenue, top earners, retention rates
- **Chain Analysis Tab**: Radar comparison charts, L2 TVL distribution, chain summary cards
- **Privacy Analysis Tab**: Speculative analysis on how privacy wrappers could benefit DeFi protocols

## Tech Stack

- React 18
- Tailwind CSS
- Recharts (for all visualizations)

## Setup Instructions

### Option 1: Create React App

```bash
npx create-react-app defi-dashboard
cd defi-dashboard
npm install recharts
```

Replace the contents of `src/App.js` with the contents of `DeFiDashboard.jsx`.

Update `src/index.css` to include Tailwind:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Configure `tailwind.config.js`:
```js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Add to `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Run: `npm start`

### Option 2: Vite (Recommended - Faster)

```bash
npm create vite@latest defi-dashboard -- --template react
cd defi-dashboard
npm install
npm install recharts
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Configure `tailwind.config.js`:
```js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Replace `src/index.css` with:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Replace `src/App.jsx` with the contents of `DeFiDashboard.jsx`.

Run: `npm run dev`

### Option 3: Next.js

```bash
npx create-next-app@latest defi-dashboard
cd defi-dashboard
npm install recharts
```

Create `app/page.jsx` (or `pages/index.jsx` for pages router) with the dashboard component.

Run: `npm run dev`

## File Structure

```
defi-dashboard/
├── src/
│   ├── App.jsx (or paste DeFiDashboard.jsx here)
│   ├── index.css (Tailwind imports)
│   └── main.jsx
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "recharts": "^2.10.0"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

## Data Sources

The dashboard includes data compiled from:
- DefiLlama
- Messari
- DappRadar
- Token Terminal

Data is from January 2026 and includes 50+ protocols across 8+ chains.

## Customization

To update the data, modify the data arrays at the top of the component:
- `chainTVLData` - Chain TVL distribution
- `topProtocolsTVL` - Protocol rankings
- `volumeData` - Trading volumes
- `activeUsersData` - User metrics
- `feeRevenueData` - Fee/revenue data

## Notes for Claude Code

1. This is a single-page React application
2. All data is hardcoded (no API calls needed)
3. The component is self-contained in one file
4. Uses Tailwind CSS for styling - make sure to configure it properly
5. Recharts is the only external charting library needed
6. The design uses a dark theme with slate colors
7. All charts are responsive using ResponsiveContainer from Recharts
