import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Sparkles, 
  BarChart3, 
  Box, 
  MousePointer, 
  Code2, 
  Zap,
  ArrowRight,
  Star
} from 'lucide-react'

const HomePage: React.FC = () => {
  const features = [
    {
      title: '動畫效果',
      description: '探索 Framer Motion 和 CSS 動畫的各種可能性',
      icon: Sparkles,
      href: '/animations',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      title: '圖表展示', 
      description: '使用 Recharts 創建美觀的數據視覺化',
      icon: BarChart3,
      href: '/charts',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: '3D 效果',
      description: '透過 Three.js 和 React Three Fiber 建立立體場景',
      icon: Box,
      href: '/3d',
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: '互動元件',
      description: '各種現代化的 UI 組件和互動效果',
      icon: MousePointer,
      href: '/interactive',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50'
    },
    {
      title: '程式編輯器',
      description: '整合 Monaco Editor 的線上程式編輯環境',
      icon: Code2,
      href: '/code-editor',
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.section 
        className="text-center py-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center justify-center p-3 mb-6 rounded-full bg-primary-100">
          <Zap className="w-8 h-8 text-primary-600 animate-bounce-gentle" />
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="text-gradient">Harry Front Lab</span>
        </h1>
        
        <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8 leading-relaxed">
          一個展示各種前端技術的現代化實驗室，探索動畫、3D 效果、圖表視覺化等前端開發的無限可能
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/animations" className="btn-primary text-lg px-8 py-3">
            開始探索
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-lg px-8 py-3"
          >
            <Star className="w-5 h-5 mr-2" />
            Source code
          </a>
        </div>
      </motion.section>

      {/* Features Grid */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="py-12"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-800 mb-4">技術展示區域</h2>
          <p className="text-lg text-neutral-600">點擊下方卡片探索不同的前端技術實現</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Link to={feature.href} className="block">
                  <div className="card p-6 h-full hover:border-primary-200 group">
                    <div className={`inline-flex p-3 rounded-lg ${feature.bgColor} mb-4 group-hover:scale-110 transition-transform duration-200`}>
                      <Icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-neutral-800 mb-3">
                      {feature.title}
                    </h3>
                    
                    <p className="text-neutral-600 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    <div className="mt-4 flex items-center text-primary-600 group-hover:text-primary-700">
                      <span className="text-sm font-medium">探索更多</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        className="py-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="card p-8 bg-gradient-to-r from-primary-50 to-accent-50">
          <h3 className="text-2xl font-bold text-neutral-800 mb-6">技術特色</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">React 18</div>
              <div className="text-neutral-600">最新的 React 框架</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">TypeScript</div>
              <div className="text-neutral-600">型別安全的開發體驗</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">Vite</div>
              <div className="text-neutral-600">極速的開發建置工具</div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default HomePage 