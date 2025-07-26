import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Home, 
  Sparkles, 
  BarChart3, 
  Box, 
  MousePointer, 
  Code2, 
  Menu,
  X,
  Github,
  Zap
} from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: '首頁', href: '/', icon: Home },
    { name: '動畫效果', href: '/animations', icon: Sparkles },
    { name: '圖表展示', href: '/charts', icon: BarChart3 },
    { name: '3D 效果', href: '/3d', icon: Box },
    { name: '互動元件', href: '/interactive', icon: MousePointer },
    { name: '程式編輯器', href: '/code-editor', icon: Code2 },
  ]

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="glass sticky top-0 z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-primary-500 text-white">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-xl font-semibold text-gradient">
                Harry Front Lab
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Link>
                )
              })}
            </div>

            {/* GitHub Link */}
            <div className="hidden md:flex items-center">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-neutral-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg text-neutral-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/20 bg-white/80 backdrop-blur-sm"
          >
            <div className="px-4 py-2 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`nav-link flex items-center w-full ${isActive ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {item.name}
                  </Link>
                )
              })}
              <div className="pt-2 border-t border-neutral-200">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link flex items-center w-full"
                >
                  <Github className="w-4 h-4 mr-3" />
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-neutral-600">
            <p>&copy; 2024 Harry Front Lab. 用於學習和測試各種前端技術。</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout 