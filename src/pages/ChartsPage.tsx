import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts'
import { BarChart3, TrendingUp, PieChart as PieChartIcon } from 'lucide-react'

const ChartsPage: React.FC = () => {
  const [activeChart, setActiveChart] = useState('line')

  // Sample data
  const lineData = [
    { name: '一月', value: 400, growth: 240 },
    { name: '二月', value: 300, growth: 198 },
    { name: '三月', value: 600, growth: 420 },
    { name: '四月', value: 800, growth: 390 },
    { name: '五月', value: 700, growth: 480 },
    { name: '六月', value: 900, growth: 520 },
    { name: '七月', value: 1100, growth: 650 },
  ]

  const barData = [
    { name: 'React', value: 85, color: '#61DAFB' },
    { name: 'Vue', value: 78, color: '#4FC08D' },
    { name: 'Angular', value: 72, color: '#DD0031' },
    { name: 'Svelte', value: 68, color: '#FF3E00' },
    { name: 'Next.js', value: 82, color: '#000000' },
  ]

  const pieData = [
    { name: 'Desktop', value: 45, color: '#0ea5e9' },
    { name: 'Mobile', value: 35, color: '#d946ef' },
    { name: 'Tablet', value: 20, color: '#eab308' },
  ]

  const areaData = [
    { name: 'Q1', desktop: 4000, mobile: 2400, tablet: 1200 },
    { name: 'Q2', desktop: 3000, mobile: 1398, tablet: 1100 },
    { name: 'Q3', desktop: 2000, mobile: 2800, tablet: 1400 },
    { name: 'Q4', desktop: 2780, mobile: 3908, tablet: 1600 },
  ]

  const radarData = [
    { subject: 'React', A: 120, B: 110, fullMark: 150 },
    { subject: 'Vue', A: 98, B: 130, fullMark: 150 },
    { subject: 'Angular', A: 86, B: 130, fullMark: 150 },
    { subject: 'Svelte', A: 99, B: 100, fullMark: 150 },
    { subject: 'Next.js', A: 85, B: 90, fullMark: 150 },
    { subject: 'Nuxt.js', A: 65, B: 85, fullMark: 150 },
  ]

  const chartTabs = [
    { id: 'line', name: '線性圖表', icon: TrendingUp },
    { id: 'bar', name: '柱狀圖表', icon: BarChart3 },
    { id: 'pie', name: '圓餅圖表', icon: PieChartIcon },
    { id: 'area', name: '區域圖表', icon: BarChart3 },
    { id: 'radar', name: '雷達圖表', icon: BarChart3 },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-blue-100">
          <BarChart3 className="w-6 h-6 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-neutral-800 mb-4">圖表展示</h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          使用 Recharts 創建美觀的數據視覺化圖表，展示各種圖表類型和互動效果
        </p>
      </motion.div>

      {/* Chart Navigation */}
      <div className="card p-6">
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {chartTabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveChart(tab.id)}
                className={`btn flex items-center ${
                  activeChart === tab.id ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.name}
              </button>
            )
          })}
        </div>

        <motion.div
          key={activeChart}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="h-96"
        >
          {activeChart === 'line' && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis dataKey="name" stroke="#737373" />
                <YAxis stroke="#737373" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e5e5',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} 
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#0ea5e9" 
                  strokeWidth={3}
                  dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 6 }}
                  name="數值"
                />
                <Line 
                  type="monotone" 
                  dataKey="growth" 
                  stroke="#d946ef" 
                  strokeWidth={3}
                  dot={{ fill: '#d946ef', strokeWidth: 2, r: 6 }}
                  name="成長"
                />
              </LineChart>
            </ResponsiveContainer>
          )}

          {activeChart === 'bar' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis dataKey="name" stroke="#737373" />
                <YAxis stroke="#737373" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e5e5',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} 
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}

          {activeChart === 'pie' && (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e5e5',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          )}

          {activeChart === 'area' && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis dataKey="name" stroke="#737373" />
                <YAxis stroke="#737373" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e5e5',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} 
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="desktop" 
                  stackId="1" 
                  stroke="#0ea5e9" 
                  fill="#0ea5e9" 
                  fillOpacity={0.6}
                  name="桌面"
                />
                <Area 
                  type="monotone" 
                  dataKey="mobile" 
                  stackId="1" 
                  stroke="#d946ef" 
                  fill="#d946ef" 
                  fillOpacity={0.6}
                  name="手機"
                />
                <Area 
                  type="monotone" 
                  dataKey="tablet" 
                  stackId="1" 
                  stroke="#eab308" 
                  fill="#eab308" 
                  fillOpacity={0.6}
                  name="平板"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}

          {activeChart === 'radar' && (
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e5e5e5" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={{ fontSize: 10 }} />
                <Radar
                  name="技能 A"
                  dataKey="A"
                  stroke="#0ea5e9"
                  fill="#0ea5e9"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Radar
                  name="技能 B"
                  dataKey="B"
                  stroke="#d946ef"
                  fill="#d946ef"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Legend />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e5e5',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} 
                />
              </RadarChart>
            </ResponsiveContainer>
          )}
        </motion.div>
      </div>

      {/* Chart Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-6 text-center"
        >
          <div className="text-3xl font-bold text-blue-600 mb-2">5+</div>
          <div className="text-neutral-600">圖表類型</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6 text-center"
        >
          <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
          <div className="text-neutral-600">響應式設計</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6 text-center"
        >
          <div className="text-3xl font-bold text-green-600 mb-2">互動式</div>
          <div className="text-neutral-600">數據視覺化</div>
        </motion.div>
      </div>

      {/* Code Example */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card p-6"
      >
        <h3 className="text-xl font-semibold text-neutral-800 mb-4">範例程式</h3>
        <div className="code-block">
          <pre>{`import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const data = [
  { name: '一月', value: 400 },
  { name: '二月', value: 300 },
  { name: '三月', value: 600 },
]

<LineChart width={600} height={300} data={data}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Line type="monotone" dataKey="value" stroke="#0ea5e9" />
</LineChart>`}</pre>
        </div>
      </motion.div>
    </div>
  )
}

export default ChartsPage 