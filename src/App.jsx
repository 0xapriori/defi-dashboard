import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Treemap } from 'recharts';

// Data for TVL by Chain (expanded)
const chainTVLData = [
  { name: 'Ethereum', tvl: 70, share: 68, color: '#627EEA' },
  { name: 'Solana', tvl: 11.5, share: 8.96, color: '#9945FF' },
  { name: 'BSC', tvl: 7.8, share: 6.46, color: '#F0B90B' },
  { name: 'Bitcoin', tvl: 6.8, share: 6.67, color: '#F7931A' },
  { name: 'Tron', tvl: 4.5, share: 4.33, color: '#FF0013' },
  { name: 'Base', tvl: 4.32, share: 4.2, color: '#0052FF' },
  { name: 'Arbitrum', tvl: 2.8, share: 2.86, color: '#28A0F0' },
  { name: 'Avalanche', tvl: 1.3, share: 1.26, color: '#E84142' },
];

// Expanded top protocols by TVL
const topProtocolsTVL = [
  { name: 'Aave', tvl: 42.47, chain: 'Multi-chain', category: 'Lending', color: '#B6509E' },
  { name: 'Lido', tvl: 38.3, chain: 'Ethereum', category: 'Liquid Staking', color: '#00A3FF' },
  { name: 'EigenLayer', tvl: 15.2, chain: 'Ethereum', category: 'Restaking', color: '#1E0046' },
  { name: 'Pendle', tvl: 13.3, chain: 'Multi-chain', category: 'Yield', color: '#24E5DF' },
  { name: 'Ethena', tvl: 8.5, chain: 'Ethereum', category: 'Synthetic', color: '#000000' },
  { name: 'Maker/Sky', tvl: 6.1, chain: 'Ethereum', category: 'CDP', color: '#1AAB9B' },
  { name: 'Uniswap', tvl: 5.57, chain: 'Multi-chain', category: 'DEX', color: '#FF007A' },
  { name: 'Rocket Pool', tvl: 4.2, chain: 'Ethereum', category: 'Liquid Staking', color: '#FF6E30' },
  { name: 'Spark', tvl: 3.8, chain: 'Ethereum', category: 'Lending', color: '#F4B731' },
  { name: 'Compound', tvl: 3.2, chain: 'Multi-chain', category: 'Lending', color: '#00D395' },
  { name: 'Kamino', tvl: 2.8, chain: 'Solana', category: 'DeFi Suite', color: '#9945FF' },
  { name: 'Jupiter', tvl: 2.6, chain: 'Solana', category: 'DEX/Agg', color: '#C7F284' },
  { name: 'Raydium', tvl: 2.3, chain: 'Solana', category: 'DEX', color: '#2DFFCA' },
  { name: 'PancakeSwap', tvl: 2.3, chain: 'BSC', category: 'DEX', color: '#1FC7D4' },
  { name: 'Convex', tvl: 2.1, chain: 'Ethereum', category: 'Yield', color: '#3A3A3A' },
  { name: 'Venus', tvl: 1.9, chain: 'BSC', category: 'Lending', color: '#F3BA2F' },
  { name: 'ListaDAO', tvl: 1.9, chain: 'BSC', category: 'Liquid Staking', color: '#FFD700' },
  { name: 'Aerodrome', tvl: 1.68, chain: 'Base', category: 'DEX', color: '#0052FF' },
  { name: 'Morpho', tvl: 1.5, chain: 'Multi-chain', category: 'Lending', color: '#2470FF' },
  { name: 'Jito', tvl: 1.2, chain: 'Solana', category: 'Liquid Staking', color: '#8B5CF6' },
];

// Protocol categories for treemap
const categoryData = [
  { name: 'Lending', size: 52, color: '#B6509E' },
  { name: 'Liquid Staking', size: 45, color: '#00A3FF' },
  { name: 'DEX', size: 18, color: '#FF007A' },
  { name: 'Restaking', size: 15, color: '#1E0046' },
  { name: 'Yield', size: 15, color: '#24E5DF' },
  { name: 'CDP/Stablecoin', size: 8, color: '#1AAB9B' },
  { name: 'Derivatives', size: 6, color: '#F97316' },
  { name: 'Bridge', size: 4, color: '#6366F1' },
];

// Expanded volume data (daily average in millions)
const volumeData = [
  { name: 'Jupiter', daily: 2000, weekly: 14000, annual: 730000, chain: 'Solana', type: 'Aggregator' },
  { name: 'PancakeSwap', daily: 1900, weekly: 13300, annual: 693500, chain: 'BSC', type: 'DEX' },
  { name: 'Uniswap', daily: 1500, weekly: 10500, annual: 547500, chain: 'Multi', type: 'DEX' },
  { name: 'Hyperliquid', daily: 1200, weekly: 8400, annual: 438000, chain: 'Hyperliquid', type: 'Perp DEX' },
  { name: 'Raydium', daily: 821, weekly: 5747, annual: 299665, chain: 'Solana', type: 'DEX' },
  { name: 'Aerodrome', daily: 810, weekly: 5670, annual: 295650, chain: 'Base', type: 'DEX' },
  { name: 'Meteora', daily: 745, weekly: 5215, annual: 271925, chain: 'Solana', type: 'DEX' },
  { name: 'Orca', daily: 598, weekly: 4186, annual: 218270, chain: 'Solana', type: 'DEX' },
  { name: 'Curve', daily: 450, weekly: 3150, annual: 164250, chain: 'Multi', type: 'DEX' },
  { name: 'GMX', daily: 450, weekly: 3150, annual: 164250, chain: 'Arbitrum', type: 'Perp DEX' },
  { name: 'dYdX', daily: 380, weekly: 2660, annual: 138700, chain: 'dYdX Chain', type: 'Perp DEX' },
  { name: 'THENA', daily: 320, weekly: 2240, annual: 116800, chain: 'BSC', type: 'DEX' },
  { name: 'Vertex', daily: 280, weekly: 1960, annual: 102200, chain: 'Arbitrum', type: 'Perp DEX' },
  { name: 'Drift', daily: 250, weekly: 1750, annual: 91250, chain: 'Solana', type: 'Perp DEX' },
  { name: 'Camelot', daily: 180, weekly: 1260, annual: 65700, chain: 'Arbitrum', type: 'DEX' },
];

// Expanded active users data
const activeUsersData = [
  { name: 'Uniswap', dau: 1200000, mau: 6300000, chain: 'Multi-chain', type: 'DEX' },
  { name: 'Raydium', dau: 700000, mau: 3500000, chain: 'Solana', type: 'DEX' },
  { name: 'Jupiter', dau: 650000, mau: 3200000, chain: 'Solana', type: 'Aggregator' },
  { name: 'PancakeSwap', dau: 450000, mau: 2200000, chain: 'BSC', type: 'DEX' },
  { name: 'Meteora', dau: 380000, mau: 1800000, chain: 'Solana', type: 'DEX' },
  { name: 'Hyperliquid', dau: 150000, mau: 720000, chain: 'Hyperliquid', type: 'Perp DEX' },
  { name: 'Aave', dau: 99200, mau: 450000, chain: 'Multi-chain', type: 'Lending' },
  { name: 'Aerodrome', dau: 85000, mau: 380000, chain: 'Base', type: 'DEX' },
  { name: 'GMX', dau: 45000, mau: 210000, chain: 'Arbitrum', type: 'Perp DEX' },
  { name: 'Lido', dau: 35000, mau: 165000, chain: 'Ethereum', type: 'Staking' },
  { name: 'Compound', dau: 28000, mau: 130000, chain: 'Multi-chain', type: 'Lending' },
  { name: 'Curve', dau: 22000, mau: 105000, chain: 'Multi-chain', type: 'DEX' },
];

// Fee revenue data (30-day in millions)
const feeRevenueData = [
  { name: 'Jupiter', fees: 101, revenue: 24.6, chain: 'Solana' },
  { name: 'Aave', fees: 96, revenue: 13.2, chain: 'Multi' },
  { name: 'Uniswap', fees: 129, revenue: 0, chain: 'Multi' },
  { name: 'Lido', fees: 92, revenue: 9.25, chain: 'Ethereum' },
  { name: 'PancakeSwap', fees: 45, revenue: 8.5, chain: 'BSC' },
  { name: 'Maker/Sky', fees: 37, revenue: 19.4, chain: 'Ethereum' },
  { name: 'Hyperliquid', fees: 35, revenue: 28, chain: 'Hyperliquid' },
  { name: 'Ethena', fees: 32, revenue: 25.6, chain: 'Ethereum' },
  { name: 'Raydium', fees: 28, revenue: 12, chain: 'Solana' },
  { name: 'Aerodrome', fees: 22, revenue: 18, chain: 'Base' },
  { name: 'GMX', fees: 18, revenue: 5.4, chain: 'Arbitrum' },
  { name: 'Pendle', fees: 8.82, revenue: 7, chain: 'Multi' },
];

// Chain comparison data for radar
const chainComparisonData = [
  { metric: 'TVL', Ethereum: 100, Solana: 16, BSC: 11, Base: 6, Arbitrum: 4 },
  { metric: 'DEX Volume', Ethereum: 45, Solana: 85, BSC: 75, Base: 50, Arbitrum: 35 },
  { metric: 'Active Users', Ethereum: 60, Solana: 90, BSC: 80, Base: 75, Arbitrum: 40 },
  { metric: 'Tx Speed', Ethereum: 20, Solana: 100, BSC: 85, Base: 70, Arbitrum: 65 },
  { metric: 'DeFi Diversity', Ethereum: 100, Solana: 70, BSC: 60, Base: 45, Arbitrum: 55 },
];

// Privacy benefits data
const privacyBenefits = [
  { benefit: 'Institutional Adoption', impact: 95, description: 'Enables hedge funds, banks, and asset managers to use DeFi without exposing strategies' },
  { benefit: 'MEV Protection', impact: 90, description: 'Eliminates front-running and sandwich attacks that cost users billions annually' },
  { benefit: 'Regulatory Compliance', impact: 85, description: 'Selective disclosure allows compliance while maintaining operational privacy' },
  { benefit: 'Competitive Advantage', impact: 88, description: 'Protocols with privacy attract higher TVL from privacy-conscious capital' },
  { benefit: 'User Experience', impact: 75, description: 'Users can transact without exposing full financial history' },
];

const COLORS = ['#627EEA', '#9945FF', '#F0B90B', '#0052FF', '#28A0F0', '#FF007A', '#00A3FF', '#24E5DF'];

export default function DeFiDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Subtle gradient background */}
      <div className="fixed inset-0 opacity-40">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-900 rounded-full filter blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-900 rounded-full filter blur-[150px]" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-50 tracking-tight">
                  DeFi Protocol Intelligence
                </h1>
                <p className="text-slate-400 mt-1 text-sm tracking-wide">Multi-Chain Analytics Dashboard • January 2026</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs text-slate-500">Total Protocols Tracked</p>
                  <p className="text-lg font-bold text-indigo-400">50+</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-sm text-slate-300">Live Data</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex gap-1">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'protocols', label: 'All Protocols' },
                { id: 'volume', label: 'Volume & Users' },
                { id: 'fees', label: 'Fees & Revenue' },
                { id: 'chains', label: 'Chain Analysis' },
                { id: 'privacy', label: 'Privacy Analysis' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-4 text-sm font-medium transition-all relative ${
                    activeTab === tab.id
                      ? 'text-slate-50'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Key Metrics */}
              <div className="grid grid-cols-5 gap-4">
                {[
                  { label: 'Total DeFi TVL', value: '$103B+', change: '+41% YoY', color: 'text-indigo-400' },
                  { label: 'DEX 24h Volume', value: '$8.2B', change: '+17% QoQ', color: 'text-cyan-400' },
                  { label: 'Perp DEX Volume', value: '$4.5B', change: 'Daily Avg', color: 'text-orange-400' },
                  { label: 'Active Wallets', value: '4.2M+', change: 'Daily', color: 'text-emerald-400' },
                  { label: 'ETH Dominance', value: '68%', change: 'of TVL', color: 'text-amber-400' },
                ].map((metric, i) => (
                  <div key={i} className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-all">
                    <p className="text-slate-400 text-sm mb-2">{metric.label}</p>
                    <p className={`text-2xl font-bold ${metric.color}`}>
                      {metric.value}
                    </p>
                    <p className="text-slate-500 text-xs mt-1">{metric.change}</p>
                  </div>
                ))}
              </div>

              {/* TVL Distribution */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800">
                  <h3 className="text-lg font-semibold text-slate-100 mb-6">TVL Distribution by Chain</h3>
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie
                        data={chainTVLData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={95}
                        paddingAngle={2}
                        dataKey="tvl"
                      >
                        {chainTVLData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        content={({ payload }) => {
                          if (payload && payload[0]) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 shadow-xl">
                                <p className="font-semibold" style={{ color: data.color }}>{data.name}</p>
                                <p className="text-slate-200">${data.tvl}B TVL</p>
                                <p className="text-slate-400 text-sm">{data.share}% share</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap gap-3 mt-4 justify-center">
                    {chainTVLData.map((chain) => (
                      <div key={chain.name} className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: chain.color }} />
                        <span className="text-xs text-slate-300">{chain.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800">
                  <h3 className="text-lg font-semibold text-slate-100 mb-6">TVL by Category ($B)</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={categoryData} layout="vertical">
                      <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis type="category" dataKey="name" tick={{ fill: '#cbd5e1', fontSize: 11 }} axisLine={false} tickLine={false} width={100} />
                      <Tooltip 
                        content={({ payload }) => {
                          if (payload && payload[0]) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 shadow-xl">
                                <p className="font-semibold text-slate-100">{data.name}</p>
                                <p className="text-slate-200">${data.size}B TVL</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="size" radius={[0, 4, 4, 0]}>
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Top 10 Protocols */}
              <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800">
                <h3 className="text-lg font-semibold text-slate-100 mb-6">Top 10 Protocols by TVL</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={topProtocolsTVL.slice(0, 10)} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                    <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="name" tick={{ fill: '#cbd5e1', fontSize: 12 }} axisLine={false} tickLine={false} width={100} />
                    <Tooltip 
                      content={({ payload }) => {
                        if (payload && payload[0]) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 shadow-xl">
                              <p className="font-semibold" style={{ color: data.color }}>{data.name}</p>
                              <p className="text-slate-200">${data.tvl}B TVL</p>
                              <p className="text-slate-400 text-sm">{data.chain} • {data.category}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="tvl" radius={[0, 4, 4, 0]}>
                      {topProtocolsTVL.slice(0, 10).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'protocols' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-50">All DeFi Protocols by Chain</h2>
              
              {/* Protocol Cards - Expanded */}
              <div className="grid grid-cols-1 gap-4">
                {[
                  { 
                    chain: 'Ethereum', 
                    color: '#627EEA',
                    tvl: '$70B',
                    protocols: [
                      { name: 'Aave', tvl: '$42.47B', category: 'Lending', fees: '$96M/mo', highlight: 'Largest lending protocol, 60%+ market share' },
                      { name: 'Lido', tvl: '$38.3B', category: 'Liquid Staking', fees: '$9.25M/mo', highlight: 'Controls ~30% of staked ETH' },
                      { name: 'EigenLayer', tvl: '$15.2B', category: 'Restaking', fees: 'N/A', highlight: 'Pioneer of restaking, AVS ecosystem' },
                      { name: 'Pendle', tvl: '$13.3B', category: 'Yield', fees: '$8.82M/mo', highlight: 'Yield tokenization leader' },
                      { name: 'Ethena', tvl: '$8.5B', category: 'Synthetic', fees: '$32M/mo', highlight: 'USDe synthetic dollar issuer' },
                      { name: 'Maker/Sky', tvl: '$6.1B', category: 'CDP', fees: '$37M/mo', highlight: 'DAI stablecoin, RWA integration' },
                      { name: 'Uniswap', tvl: '$5.57B', category: 'DEX', fees: '$129M/mo', highlight: 'Pioneer AMM, V4 hooks ecosystem' },
                      { name: 'Rocket Pool', tvl: '$4.2B', category: 'Liquid Staking', fees: 'N/A', highlight: 'Decentralized ETH staking' },
                      { name: 'Spark', tvl: '$3.8B', category: 'Lending', fees: 'N/A', highlight: 'MakerDAO lending frontend' },
                      { name: 'Compound', tvl: '$3.2B', category: 'Lending', fees: 'N/A', highlight: 'OG lending protocol' },
                      { name: 'Convex', tvl: '$2.1B', category: 'Yield', fees: 'N/A', highlight: 'Curve yield booster' },
                      { name: 'Curve', tvl: '$1.8B', category: 'DEX', fees: '$9.4M/mo', highlight: 'Stablecoin specialist, crvUSD' },
                    ]
                  },
                  { 
                    chain: 'Solana', 
                    color: '#9945FF',
                    tvl: '$11.5B',
                    protocols: [
                      { name: 'Kamino', tvl: '$2.8B', category: 'DeFi Suite', fees: 'N/A', highlight: 'Automated liquidity management' },
                      { name: 'Jupiter', tvl: '$2.6B', category: 'Aggregator', fees: '$101M/mo', highlight: '#1 fee earner in DeFi' },
                      { name: 'Raydium', tvl: '$2.3B', category: 'DEX', fees: '$28M/mo', highlight: 'Primary Solana AMM' },
                      { name: 'Jito', tvl: '$1.2B', category: 'Liquid Staking', fees: 'N/A', highlight: 'MEV-powered staking' },
                      { name: 'Marinade', tvl: '$950M', category: 'Liquid Staking', fees: 'N/A', highlight: 'mSOL liquid staking' },
                      { name: 'Meteora', tvl: '$800M', category: 'DEX', fees: 'N/A', highlight: 'Dynamic liquidity pools' },
                      { name: 'Orca', tvl: '$650M', category: 'DEX', fees: 'N/A', highlight: 'User-friendly AMM' },
                      { name: 'Drift', tvl: '$450M', category: 'Perp DEX', fees: 'N/A', highlight: 'Leading Solana perps' },
                      { name: 'Sanctum', tvl: '$400M', category: 'Liquid Staking', fees: 'N/A', highlight: 'LST aggregator' },
                      { name: 'Save (Solend)', tvl: '$350M', category: 'Lending', fees: 'N/A', highlight: 'Lending protocol' },
                      { name: 'marginfi', tvl: '$300M', category: 'Lending', fees: 'N/A', highlight: 'Borrow/lend platform' },
                      { name: 'Phoenix', tvl: '$250M', category: 'DEX', fees: 'N/A', highlight: 'Order book DEX' },
                    ]
                  },
                  { 
                    chain: 'BSC (BNB Chain)', 
                    color: '#F0B90B',
                    tvl: '$7.8B',
                    protocols: [
                      { name: 'PancakeSwap', tvl: '$2.3B', category: 'DEX', fees: '$45M/mo', highlight: 'Dominant BSC DEX' },
                      { name: 'ListaDAO', tvl: '$1.9B', category: 'Liquid Staking', fees: 'N/A', highlight: 'slisBNB dominates' },
                      { name: 'Venus', tvl: '$1.9B', category: 'Lending', fees: 'N/A', highlight: 'Primary money market' },
                      { name: 'Aster', tvl: '$800M', category: 'Perp DEX', fees: 'N/A', highlight: '20% global perp volume' },
                      { name: 'Alpaca Finance', tvl: '$450M', category: 'Yield', fees: 'N/A', highlight: 'Leveraged yield farming' },
                      { name: 'THENA', tvl: '$500M', category: 'DEX', fees: 'N/A', highlight: 've(3,3) liquidity layer' },
                      { name: 'Radiant', tvl: '$300M', category: 'Lending', fees: 'N/A', highlight: 'Cross-chain lending' },
                      { name: 'Biswap', tvl: '$180M', category: 'DEX', fees: 'N/A', highlight: 'GameFi DEX' },
                    ]
                  },
                  { 
                    chain: 'Base', 
                    color: '#0052FF',
                    tvl: '$4.32B',
                    protocols: [
                      { name: 'Aerodrome', tvl: '$1.68B', category: 'DEX', fees: '$22M/mo', highlight: '~50% of Base TVL' },
                      { name: 'Uniswap', tvl: '$800M', category: 'DEX', fees: 'N/A', highlight: 'Strong L2 presence' },
                      { name: 'Aave', tvl: '$500M', category: 'Lending', fees: 'N/A', highlight: 'Growing lending market' },
                      { name: 'Morpho', tvl: '$350M', category: 'Lending', fees: 'N/A', highlight: 'P2P lending optimization' },
                      { name: 'Moonwell', tvl: '$280M', category: 'Lending', fees: 'N/A', highlight: 'Native Base lending' },
                      { name: 'Extra Finance', tvl: '$200M', category: 'Yield', fees: 'N/A', highlight: 'Leveraged yield' },
                      { name: 'Seamless', tvl: '$150M', category: 'Lending', fees: 'N/A', highlight: 'ILM lending' },
                      { name: 'Velodrome', tvl: '$120M', category: 'DEX', fees: 'N/A', highlight: 've(3,3) DEX' },
                    ]
                  },
                  { 
                    chain: 'Arbitrum', 
                    color: '#28A0F0',
                    tvl: '$2.8B',
                    protocols: [
                      { name: 'GMX', tvl: '$800M', category: 'Perp DEX', fees: '$18M/mo', highlight: 'Pioneer onchain perps' },
                      { name: 'Aave', tvl: '$600M', category: 'Lending', fees: 'N/A', highlight: 'Primary lending venue' },
                      { name: 'Uniswap', tvl: '$400M', category: 'DEX', fees: 'N/A', highlight: 'Established DEX' },
                      { name: 'Pendle', tvl: '$350M', category: 'Yield', fees: 'N/A', highlight: 'Yield tokenization' },
                      { name: 'Radiant', tvl: '$280M', category: 'Lending', fees: 'N/A', highlight: 'Cross-chain lending' },
                      { name: 'Vertex', tvl: '$250M', category: 'Perp DEX', fees: 'N/A', highlight: 'Hybrid DEX' },
                      { name: 'Camelot', tvl: '$180M', category: 'DEX', fees: 'N/A', highlight: 'Native Arbitrum DEX' },
                      { name: 'Jones DAO', tvl: '$120M', category: 'Yield', fees: 'N/A', highlight: 'Options vaults' },
                    ]
                  },
                  { 
                    chain: 'Other Chains', 
                    color: '#6366F1',
                    tvl: '$12B+',
                    protocols: [
                      { name: 'Hyperliquid', tvl: '$2.5B', category: 'Perp DEX', fees: '$35M/mo', highlight: 'App-specific chain perps' },
                      { name: 'dYdX', tvl: '$307M', category: 'Perp DEX', fees: 'N/A', highlight: 'Cosmos-based perps' },
                      { name: 'JustLend', tvl: '$4.2B', category: 'Lending', fees: 'N/A', highlight: 'Tron lending leader' },
                      { name: 'SunSwap', tvl: '$800M', category: 'DEX', fees: 'N/A', highlight: 'Tron DEX' },
                      { name: 'Trader Joe', tvl: '$350M', category: 'DEX', fees: 'N/A', highlight: 'Avalanche DEX' },
                      { name: 'Benqi', tvl: '$280M', category: 'Lending', fees: 'N/A', highlight: 'Avalanche lending' },
                      { name: 'Cetus', tvl: '$220M', category: 'DEX', fees: 'N/A', highlight: 'Sui DEX' },
                      { name: 'NAVI', tvl: '$180M', category: 'Lending', fees: 'N/A', highlight: 'Sui lending' },
                    ]
                  },
                ].map((chainData) => (
                  <div key={chainData.chain} className="bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between" style={{ backgroundColor: `${chainData.color}20` }}>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: chainData.color }} />
                        <h3 className="text-lg font-semibold text-slate-50">{chainData.chain}</h3>
                      </div>
                      <span className="text-sm font-medium text-slate-300">Total TVL: {chainData.tvl}</span>
                    </div>
                    <div className="grid grid-cols-4 divide-x divide-slate-800">
                      {chainData.protocols.slice(0, 8).map((protocol) => (
                        <div key={protocol.name} className="p-4 hover:bg-slate-800/50 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-slate-100 text-sm">{protocol.name}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">{protocol.category}</span>
                          </div>
                          <p className="text-xl font-bold text-indigo-400">{protocol.tvl}</p>
                          <p className="text-xs text-slate-500 mt-1">Fees: {protocol.fees}</p>
                          <p className="text-xs text-slate-400 mt-2 line-clamp-2">{protocol.highlight}</p>
                        </div>
                      ))}
                    </div>
                    {chainData.protocols.length > 8 && (
                      <div className="grid grid-cols-4 divide-x divide-slate-800 border-t border-slate-800">
                        {chainData.protocols.slice(8, 12).map((protocol) => (
                          <div key={protocol.name} className="p-4 hover:bg-slate-800/50 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-slate-100 text-sm">{protocol.name}</span>
                              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">{protocol.category}</span>
                            </div>
                            <p className="text-xl font-bold text-indigo-400">{protocol.tvl}</p>
                            <p className="text-xs text-slate-500 mt-1">Fees: {protocol.fees}</p>
                            <p className="text-xs text-slate-400 mt-2 line-clamp-2">{protocol.highlight}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'volume' && (
            <div className="space-y-8">
              {/* Volume Comparison */}
              <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800">
                <h3 className="text-xl font-semibold text-slate-50 mb-6">Daily Trading Volume by Protocol ($M)</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={volumeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" tick={{ fill: '#cbd5e1', fontSize: 11 }} axisLine={false} angle={-45} textAnchor="end" height={80} />
                    <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      content={({ payload, label }) => {
                        if (payload && payload[0]) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 shadow-xl">
                              <p className="font-semibold text-slate-100 mb-2">{label}</p>
                              <p className="text-slate-200">Daily: ${data.daily.toLocaleString()}M</p>
                              <p className="text-slate-300">Weekly: ${data.weekly.toLocaleString()}M</p>
                              <p className="text-slate-400">Annual: ${(data.annual/1000).toFixed(1)}B</p>
                              <p className="text-xs text-slate-500 mt-1">{data.chain} • {data.type}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="daily" fill="#818cf8" radius={[4, 4, 0, 0]} name="Daily Volume" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Volume Table */}
              <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800">
                <h3 className="text-xl font-semibold text-slate-50 mb-6">Volume Breakdown - All Protocols</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-slate-400 text-sm border-b border-slate-700">
                        <th className="pb-4 font-medium">Protocol</th>
                        <th className="pb-4 font-medium">Chain</th>
                        <th className="pb-4 font-medium">Type</th>
                        <th className="pb-4 font-medium text-right">Daily Volume</th>
                        <th className="pb-4 font-medium text-right">Weekly Volume</th>
                        <th className="pb-4 font-medium text-right">Annual Volume</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {volumeData.map((row) => (
                        <tr key={row.name} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                          <td className="py-3 font-semibold text-slate-100">{row.name}</td>
                          <td className="py-3 text-slate-400">{row.chain}</td>
                          <td className="py-3">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${row.type === 'Perp DEX' ? 'bg-orange-900/50 text-orange-400' : row.type === 'Aggregator' ? 'bg-purple-900/50 text-purple-400' : 'bg-cyan-900/50 text-cyan-400'}`}>
                              {row.type}
                            </span>
                          </td>
                          <td className="py-3 text-right text-emerald-400 font-medium">${row.daily.toLocaleString()}M</td>
                          <td className="py-3 text-right text-cyan-400">${row.weekly.toLocaleString()}M</td>
                          <td className="py-3 text-right text-indigo-400">${(row.annual/1000).toFixed(1)}B</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Active Users */}
              <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800">
                <h3 className="text-xl font-semibold text-slate-50 mb-6">Active Users by Protocol</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={activeUsersData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" tick={{ fill: '#cbd5e1', fontSize: 11 }} axisLine={false} angle={-45} textAnchor="end" height={80} />
                    <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v/1000000).toFixed(1)}M`} />
                    <Tooltip
                      content={({ payload, label }) => {
                        if (payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 shadow-xl">
                              <p className="font-semibold text-slate-100 mb-2">{label}</p>
                              <p className="text-cyan-400">DAU: {(data.dau/1000000).toFixed(2)}M</p>
                              <p className="text-purple-400">MAU: {(data.mau/1000000).toFixed(2)}M</p>
                              <p className="text-xs text-slate-500 mt-1">{data.chain} • {data.type}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend wrapperStyle={{ color: '#cbd5e1' }} />
                    <Bar dataKey="dau" fill="#22d3ee" radius={[4, 4, 0, 0]} name="Daily Active Users" />
                    <Bar dataKey="mau" fill="#a78bfa" radius={[4, 4, 0, 0]} name="Monthly Active Users" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'fees' && (
            <div className="space-y-8">
              {/* Fee Revenue Chart */}
              <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800">
                <h3 className="text-xl font-semibold text-slate-50 mb-6">30-Day Fees vs Revenue ($M)</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={feeRevenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" tick={{ fill: '#cbd5e1', fontSize: 11 }} axisLine={false} angle={-45} textAnchor="end" height={80} />
                    <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      content={({ payload, label }) => {
                        if (payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 shadow-xl">
                              <p className="font-semibold text-slate-100 mb-2">{label}</p>
                              <p className="text-cyan-400">Fees: ${data.fees}M</p>
                              <p className="text-emerald-400">Revenue: ${data.revenue}M</p>
                              <p className="text-slate-400 text-sm">Retention: {((data.revenue/data.fees)*100).toFixed(1)}%</p>
                              <p className="text-xs text-slate-500 mt-1">{data.chain}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend wrapperStyle={{ color: '#cbd5e1' }} />
                    <Bar dataKey="fees" fill="#22d3ee" radius={[4, 4, 0, 0]} name="Total Fees" />
                    <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} name="Protocol Revenue" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Fee Leaders */}
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800">
                  <h4 className="text-lg font-semibold text-slate-100 mb-4">🏆 Top Fee Generators</h4>
                  <div className="space-y-3">
                    {feeRevenueData.slice(0, 5).map((p, i) => (
                      <div key={p.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-slate-500 text-sm w-4">{i + 1}.</span>
                          <span className="text-slate-200 font-medium">{p.name}</span>
                        </div>
                        <span className="text-cyan-400 font-semibold">${p.fees}M</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800">
                  <h4 className="text-lg font-semibold text-slate-100 mb-4">💰 Top Revenue Earners</h4>
                  <div className="space-y-3">
                    {[...feeRevenueData].sort((a, b) => b.revenue - a.revenue).slice(0, 5).map((p, i) => (
                      <div key={p.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-slate-500 text-sm w-4">{i + 1}.</span>
                          <span className="text-slate-200 font-medium">{p.name}</span>
                        </div>
                        <span className="text-emerald-400 font-semibold">${p.revenue}M</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800">
                  <h4 className="text-lg font-semibold text-slate-100 mb-4">📊 Best Fee Retention</h4>
                  <div className="space-y-3">
                    {[...feeRevenueData].filter(p => p.revenue > 0).sort((a, b) => (b.revenue/b.fees) - (a.revenue/a.fees)).slice(0, 5).map((p, i) => (
                      <div key={p.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-slate-500 text-sm w-4">{i + 1}.</span>
                          <span className="text-slate-200 font-medium">{p.name}</span>
                        </div>
                        <span className="text-amber-400 font-semibold">{((p.revenue/p.fees)*100).toFixed(0)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Fee Table */}
              <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800">
                <h3 className="text-xl font-semibold text-slate-50 mb-6">Complete Fee & Revenue Data</h3>
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-slate-400 text-sm border-b border-slate-700">
                      <th className="pb-4 font-medium">Protocol</th>
                      <th className="pb-4 font-medium">Chain</th>
                      <th className="pb-4 font-medium text-right">30d Fees</th>
                      <th className="pb-4 font-medium text-right">30d Revenue</th>
                      <th className="pb-4 font-medium text-right">Retention Rate</th>
                      <th className="pb-4 font-medium text-right">Annual Fees (Est.)</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {feeRevenueData.map((row) => (
                      <tr key={row.name} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                        <td className="py-3 font-semibold text-slate-100">{row.name}</td>
                        <td className="py-3 text-slate-400">{row.chain}</td>
                        <td className="py-3 text-right text-cyan-400 font-medium">${row.fees}M</td>
                        <td className="py-3 text-right text-emerald-400">${row.revenue}M</td>
                        <td className="py-3 text-right text-amber-400">{row.revenue > 0 ? ((row.revenue/row.fees)*100).toFixed(1) : '0'}%</td>
                        <td className="py-3 text-right text-indigo-400">${(row.fees * 12).toFixed(0)}M</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'chains' && (
            <div className="space-y-8">
              {/* Chain Radar */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800">
                  <h3 className="text-xl font-semibold text-slate-50 mb-6">Chain Comparison (Normalized)</h3>
                  <ResponsiveContainer width="100%" height={350}>
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chainComparisonData}>
                      <PolarGrid stroke="#475569" />
                      <PolarAngleAxis dataKey="metric" tick={{ fill: '#cbd5e1', fontSize: 11 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 10 }} />
                      <Radar name="Ethereum" dataKey="Ethereum" stroke="#627EEA" fill="#627EEA" fillOpacity={0.3} />
                      <Radar name="Solana" dataKey="Solana" stroke="#9945FF" fill="#9945FF" fillOpacity={0.3} />
                      <Radar name="BSC" dataKey="BSC" stroke="#F0B90B" fill="#F0B90B" fillOpacity={0.3} />
                      <Legend wrapperStyle={{ color: '#cbd5e1' }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800">
                  <h3 className="text-xl font-semibold text-slate-50 mb-6">L2 TVL Distribution</h3>
                  <div className="space-y-4">
                    {[
                      { name: 'Base', tvl: 4.32, share: 46.58, color: '#0052FF' },
                      { name: 'Arbitrum', tvl: 2.8, share: 30.86, color: '#28A0F0' },
                      { name: 'OP Mainnet', tvl: 1.2, share: 12.89, color: '#FF0420' },
                      { name: 'Scroll', tvl: 0.4, share: 4.3, color: '#FFCB47' },
                      { name: 'zkSync Era', tvl: 0.35, share: 3.77, color: '#8C8DFC' },
                      { name: 'Other L2s', tvl: 0.15, share: 1.6, color: '#6366f1' },
                    ].map((l2) => (
                      <div key={l2.name} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-200">{l2.name}</span>
                          <span className="text-slate-400">${l2.tvl}B ({l2.share}%)</span>
                        </div>
                        <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all"
                            style={{ width: `${l2.share}%`, backgroundColor: l2.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Chain Summary Cards */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { name: 'Ethereum', tvl: '$70B', fees: 'High', speed: '12-15 TPS', users: '431K DAA', protocols: '500+', highlight: 'Security & liquidity leader', color: '#627EEA' },
                  { name: 'Solana', tvl: '$11.5B', fees: 'Ultra-low', speed: '65K TPS', users: '2.8M DAU', protocols: '200+', highlight: 'Speed & retail adoption', color: '#9945FF' },
                  { name: 'BSC', tvl: '$7.8B', fees: 'Low', speed: '0.75s blocks', users: '4.8M DAU', protocols: '300+', highlight: 'Binance ecosystem', color: '#F0B90B' },
                  { name: 'Base', tvl: '$4.32B', fees: 'Very low', speed: '50M tx/mo', users: '1M+ DAU', protocols: '100+', highlight: 'Fastest L2 growth', color: '#0052FF' },
                  { name: 'Arbitrum', tvl: '$2.8B', fees: 'Low', speed: '40M tx/mo', users: '250K DAU', protocols: '400+', highlight: 'Most mature L2', color: '#28A0F0' },
                  { name: 'Avalanche', tvl: '$1.3B', fees: 'Low', speed: '4.5K TPS', users: '150K DAU', protocols: '200+', highlight: 'Subnet architecture', color: '#E84142' },
                  { name: 'Tron', tvl: '$4.5B', fees: 'Very low', speed: '2K TPS', users: '2M DAU', protocols: '50+', highlight: 'Stablecoin hub', color: '#FF0013' },
                  { name: 'Sui', tvl: '$1.2B', fees: 'Ultra-low', speed: '297K TPS', users: '500K DAU', protocols: '80+', highlight: 'Move language', color: '#6FBCF0' },
                ].map((chain) => (
                  <div key={chain.name} className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 hover:border-slate-700 transition-all">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: chain.color }} />
                      <h4 className="font-semibold text-slate-50">{chain.name}</h4>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500">TVL</span>
                        <span className="text-slate-200 font-medium">{chain.tvl}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Fees</span>
                        <span className="text-slate-300">{chain.fees}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Speed</span>
                        <span className="text-slate-300">{chain.speed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Users</span>
                        <span className="text-slate-300">{chain.users}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Protocols</span>
                        <span className="text-slate-300">{chain.protocols}</span>
                      </div>
                    </div>
                    <p className="text-xs text-indigo-400 mt-3">{chain.highlight}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-8">
              {/* Privacy Header */}
              <div className="bg-gradient-to-r from-indigo-950 to-purple-950 rounded-2xl p-8 border border-indigo-800/50">
                <h2 className="text-3xl font-bold text-slate-50 mb-4">Privacy Wrappers: The Next DeFi Frontier</h2>
                <p className="text-slate-300 text-lg max-w-3xl">
                  How privacy-preserving technology could transform the 50+ top DeFi protocols and unlock trillions in institutional capital.
                </p>
              </div>

              {/* Privacy Benefits Chart */}
              <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800">
                <h3 className="text-xl font-semibold text-slate-50 mb-6">Privacy Wrapper Impact Assessment</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={privacyBenefits} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickFormatter={(v) => `${v}%`} />
                    <YAxis type="category" dataKey="benefit" tick={{ fill: '#cbd5e1', fontSize: 12 }} axisLine={false} width={160} />
                    <Tooltip
                      content={({ payload }) => {
                        if (payload && payload[0]) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 max-w-xs shadow-xl">
                              <p className="font-semibold text-slate-100 mb-1">{data.benefit}</p>
                              <p className="text-indigo-400 text-lg">{data.impact}% Impact</p>
                              <p className="text-slate-400 text-sm mt-2">{data.description}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="impact" fill="url(#privacyGradient)" radius={[0, 4, 4, 0]} />
                    <defs>
                      <linearGradient id="privacyGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#818cf8" />
                        <stop offset="100%" stopColor="#22d3ee" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Protocol-Specific Privacy Analysis - Expanded */}
              <div className="grid grid-cols-1 gap-6">
                <h3 className="text-xl font-semibold text-slate-50">Protocol-Specific Privacy Wrapper Benefits</h3>
                
                {[
                  {
                    category: 'DEXs & Aggregators',
                    protocols: 'Uniswap, Jupiter, PancakeSwap, Aerodrome, Raydium, Curve, Orca, Meteora, Camelot, THENA',
                    icon: '🔄',
                    benefits: [
                      { title: 'MEV Elimination', desc: 'Zero-knowledge order flow prevents front-running and sandwich attacks, estimated to save users $1.3B+ annually' },
                      { title: 'Institutional Trading', desc: 'Large trades execute without revealing strategy—critical for hedge funds managing $100M+ positions' },
                      { title: 'Dark Pool Functionality', desc: 'Native dark pool features without compromising decentralization, competing with TradFi venues' },
                      { title: 'Competitive Pricing', desc: 'Market makers offer tighter spreads knowing counterparty information is protected' },
                    ],
                    projected: '+35-50% TVL within 12 months'
                  },
                  {
                    category: 'Lending Protocols',
                    protocols: 'Aave, Compound, Venus, Spark, Morpho, Radiant, Benqi, Moonwell, marginfi, Save',
                    icon: '🏦',
                    benefits: [
                      { title: 'Hidden Collateral Positions', desc: 'Borrowers take leveraged positions without exposing liquidation levels to predatory traders' },
                      { title: 'Institutional Compliance', desc: 'Banks use DeFi lending while maintaining client confidentiality (GDPR, financial secrecy)' },
                      { title: 'Credit Markets', desc: 'Enables undercollateralized lending through private credit scoring without exposing data' },
                      { title: 'Treasury Management', desc: 'DAOs and corporations manage treasuries without competitors seeing positions' },
                    ],
                    projected: '+60-80% institutional TVL, potential $100B+ deposits'
                  },
                  {
                    category: 'Liquid Staking & Restaking',
                    protocols: 'Lido, Rocket Pool, EigenLayer, Jito, Marinade, ListaDAO, Sanctum, Benqi, Ankr',
                    icon: '💎',
                    benefits: [
                      { title: 'Validator Privacy', desc: 'Hide staking distributions and validator selections from competitive analysis' },
                      { title: 'Institutional Staking', desc: 'Asset managers stake client funds without revealing AUM or allocation strategies' },
                      { title: 'MEV Distribution', desc: 'Private MEV sharing prevents gaming of reward distributions' },
                      { title: 'AVS Selection Privacy', desc: 'Restakers choose AVS allocations privately, preventing copy-trading and front-running' },
                    ],
                    projected: '+25-40% TVL from institutional allocators'
                  },
                  {
                    category: 'Perpetual DEXs',
                    protocols: 'GMX, Hyperliquid, dYdX, Jupiter Perps, Drift, Vertex, Aster',
                    icon: '📈',
                    benefits: [
                      { title: 'Position Privacy', desc: 'Traders build large positions without revealing entries or stop-losses to adversaries' },
                      { title: 'Strategy Protection', desc: 'Quantitative funds deploy on-chain strategies without IP exposure' },
                      { title: 'Reduced Manipulation', desc: 'Hidden open interest prevents coordinated liquidation hunting' },
                      { title: 'Professional Trading', desc: 'Matches TradFi execution quality for institutional adoption' },
                    ],
                    projected: '+100-200% volume from professional desks'
                  },
                  {
                    category: 'CDP & Synthetic Protocols',
                    protocols: 'Maker/Sky, Ethena, Frax, Liquity, Synthetix',
                    icon: '🪙',
                    benefits: [
                      { title: 'Private Minting', desc: 'Users mint stablecoins without revealing collateral positions or health factors' },
                      { title: 'Corporate Treasury', desc: 'Companies use CDP stablecoins for payroll without exposing treasury size' },
                      { title: 'Synthetic Assets', desc: 'Trade synthetic stocks/commodities without revealing portfolio composition' },
                      { title: 'Cross-Border Payments', desc: 'Private stablecoin transfers for legitimate business confidentiality' },
                    ],
                    projected: '+40-60% TVL from corporate users'
                  },
                  {
                    category: 'Yield & Structured Products',
                    protocols: 'Pendle, Convex, Yearn, Beefy, Sommelier, Jones DAO',
                    icon: '🌾',
                    benefits: [
                      { title: 'Strategy Confidentiality', desc: 'Vault strategies remain private, preventing copy-trading and front-running' },
                      { title: 'Yield Source Privacy', desc: 'Users earn yield without revealing which pools or strategies they use' },
                      { title: 'Institutional Yield', desc: 'Pension funds access DeFi yields without public position disclosure' },
                      { title: 'Tax Optimization', desc: 'Manage yield harvesting privately for legitimate tax planning' },
                    ],
                    projected: '+50-70% AUM from institutional yield seekers'
                  },
                ].map((section) => (
                  <div key={section.category} className="bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-700 bg-gradient-to-r from-indigo-900/40 to-transparent">
                      <h4 className="text-lg font-semibold text-slate-50 flex items-center gap-3">
                        <span className="text-2xl">{section.icon}</span>
                        {section.category}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">{section.protocols}</p>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {section.benefits.map((benefit, i) => (
                          <div key={i} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                            <h5 className="font-semibold text-indigo-400 mb-2">{benefit.title}</h5>
                            <p className="text-sm text-slate-300">{benefit.desc}</p>
                          </div>
                        ))}
                      </div>
                      <div className="bg-emerald-900/30 border border-emerald-800/50 rounded-lg px-4 py-3">
                        <span className="text-emerald-400 font-semibold">Projected Impact: </span>
                        <span className="text-slate-200">{section.projected}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Technologies & Market */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800">
                  <h3 className="text-xl font-semibold text-slate-50 mb-6">Privacy Technologies</h3>
                  <div className="space-y-4">
                    {[
                      { name: 'Zero-Knowledge Proofs', status: 'Production', providers: 'Aztec, zkSync, StarkNet', desc: 'Verifiable private transactions' },
                      { name: 'FHE (Homomorphic)', status: 'Emerging', providers: 'Zama, Zaiffer, Fhenix', desc: 'Compute on encrypted data' },
                      { name: 'TEEs', status: 'Production', providers: 'iExec, Secret Network, Oasis', desc: 'Secure enclave execution' },
                      { name: 'MPC', status: 'Production', providers: 'Fireblocks, Zengo', desc: 'Distributed key management' },
                      { name: 'Stealth Addresses', status: 'Growing', providers: 'Umbra, Railgun', desc: 'One-time receiving addresses' },
                    ].map((tech) => (
                      <div key={tech.name} className="flex items-start gap-4 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-slate-100">{tech.name}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${tech.status === 'Production' ? 'bg-emerald-900/50 text-emerald-400' : 'bg-amber-900/50 text-amber-400'}`}>
                              {tech.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400">{tech.providers}</p>
                          <p className="text-xs text-slate-500 mt-1">{tech.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-cyan-950 to-indigo-950 rounded-2xl p-6 border border-cyan-800/30">
                  <h3 className="text-xl font-semibold text-slate-50 mb-6">Market Opportunity</h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-slate-900/50 rounded-xl">
                      <p className="text-3xl font-bold text-cyan-400">$16T</p>
                      <p className="text-slate-400 text-xs mt-1">RWA tokenization by 2030</p>
                    </div>
                    <div className="text-center p-4 bg-slate-900/50 rounded-xl">
                      <p className="text-3xl font-bold text-indigo-400">76%</p>
                      <p className="text-slate-400 text-xs mt-1">Institutions expanding crypto</p>
                    </div>
                    <div className="text-center p-4 bg-slate-900/50 rounded-xl">
                      <p className="text-3xl font-bold text-emerald-400">$7.59B</p>
                      <p className="text-slate-400 text-xs mt-1">ZKP market by 2033</p>
                    </div>
                    <div className="text-center p-4 bg-slate-900/50 rounded-xl">
                      <p className="text-3xl font-bold text-amber-400">22.1%</p>
                      <p className="text-slate-400 text-xs mt-1">ZKP market CAGR</p>
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm">
                    Privacy infrastructure is the critical missing piece for DeFi to capture institutional capital at scale. 
                    Protocols integrating privacy-preserving technology first will dominate the next growth phase.
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-800 mt-12 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-6 py-6 text-center text-slate-500 text-sm">
            <p>Data sourced from DefiLlama, Messari, DappRadar, Token Terminal • January 2026</p>
            <p className="mt-1">50+ protocols tracked across 8+ chains • Privacy analysis based on emerging protocol developments</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
