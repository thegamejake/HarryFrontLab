import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MousePointer, 
  Bell, 
  Settings, 
  Check, 
  X, 
  Heart,
  Share,
  Download,
  ChevronDown,
  Star,
  Plus,
  Minus
} from 'lucide-react'

const InteractivePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [notification, setNotification] = useState('')
  const [likes, setLikes] = useState(42)
  const [isLiked, setIsLiked] = useState(false)
  const [accordionOpen, setAccordionOpen] = useState<number | null>(null)
  const [sliderValue, setSliderValue] = useState(50)
  const [switchValue, setSwitchValue] = useState(false)

  const showNotification = (message: string) => {
    setNotification(message)
    setTimeout(() => setNotification(''), 3000)
  }

  const toggleLike = () => {
    setIsLiked(!isLiked)
    setLikes(prev => isLiked ? prev - 1 : prev + 1)
  }

  const accordionItems = [
    {
      title: 'React 基礎知識',
      content: 'React 是一個用於構建用戶界面的 JavaScript 庫，特別適合構建單頁應用程序。'
    },
    {
      title: 'TypeScript 優勢',
      content: 'TypeScript 提供靜態類型檢查，幫助開發者在編譯時發現錯誤，提高程式質量。'
    },
    {
      title: 'Vite 構建工具',
      content: 'Vite 是一個快速的前端構建工具，提供極速的開發服務器和優化的生產構建。'
    }
  ]

  return (
    <div className="space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-orange-100">
          <MousePointer className="w-6 h-6 text-orange-600" />
        </div>
        <h1 className="text-4xl font-bold text-neutral-800 mb-4">互動元件展示</h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          各種現代化的 UI 組件和互動效果，展示豐富的用戶體驗設計
        </p>
      </motion.div>

      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
          >
            <div className="flex items-center">
              <Check className="w-5 h-5 mr-2" />
              {notification}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Buttons */}
      <div className="card p-8">
        <h2 className="text-2xl font-bold text-neutral-800 mb-6">互動按鈕</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Like Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleLike}
            className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all duration-200 ${
              isLiked 
                ? 'border-red-300 bg-red-50 text-red-600' 
                : 'border-neutral-300 bg-white text-neutral-600 hover:border-red-300'
            }`}
          >
            <motion.div
              animate={{ scale: isLiked ? [1, 1.3, 1] : 1 }}
              transition={{ duration: 0.3 }}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </motion.div>
            <span className="font-medium">{likes}</span>
          </motion.button>

          {/* Share Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => showNotification('分享功能已觸發！')}
            className="flex items-center justify-center gap-2 p-4 rounded-lg border-2 border-blue-300 bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all duration-200"
          >
            <Share className="w-5 h-5" />
            <span className="font-medium">分享</span>
          </motion.button>

          {/* Download Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => showNotification('下載已開始！')}
            className="flex items-center justify-center gap-2 p-4 rounded-lg border-2 border-green-300 bg-green-50 text-green-600 hover:bg-green-100 transition-all duration-200"
          >
            <Download className="w-5 h-5" />
            <span className="font-medium">下載</span>
          </motion.button>

          {/* Settings Button */}
          <motion.button
            whileHover={{ scale: 1.05, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 p-4 rounded-lg border-2 border-purple-300 bg-purple-50 text-purple-600 hover:bg-purple-100 transition-all duration-200"
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium">設定</span>
          </motion.button>
        </div>
      </div>

      {/* Accordion */}
      <div className="card p-8">
        <h2 className="text-2xl font-bold text-neutral-800 mb-6">摺疊面板</h2>
        
        <div className="space-y-4">
          {accordionItems.map((item, index) => (
            <div key={index} className="border border-neutral-200 rounded-lg overflow-hidden">
              <motion.button
                onClick={() => setAccordionOpen(accordionOpen === index ? null : index)}
                className="w-full p-4 text-left flex items-center justify-between bg-neutral-50 hover:bg-neutral-100 transition-colors duration-200"
              >
                <span className="font-medium text-neutral-800">{item.title}</span>
                <motion.div
                  animate={{ rotate: accordionOpen === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-neutral-600" />
                </motion.div>
              </motion.button>
              
              <AnimatePresence>
                {accordionOpen === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 text-neutral-600 bg-white">
                      {item.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="card p-8">
        <h2 className="text-2xl font-bold text-neutral-800 mb-6">控制元件</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Slider */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">
              滑動控制器：{sliderValue}%
            </h3>
            <div className="relative">
              <input
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={(e) => setSliderValue(Number(e.target.value))}
                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #0ea5e9 0%, #0ea5e9 ${sliderValue}%, #e5e5e5 ${sliderValue}%, #e5e5e5 100%)`
                }}
              />
            </div>
            <div className="mt-2 flex justify-between text-sm text-neutral-600">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Switch */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">
              開關控制：{switchValue ? '開啟' : '關閉'}
            </h3>
            <motion.button
              onClick={() => setSwitchValue(!switchValue)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                switchValue ? 'bg-primary-500' : 'bg-neutral-300'
              }`}
            >
              <motion.span
                animate={{ x: switchValue ? 24 : 4 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="inline-block h-6 w-6 rounded-full bg-white shadow-sm"
              />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Counter */}
      <div className="card p-8">
        <h2 className="text-2xl font-bold text-neutral-800 mb-6">計數器</h2>
        
        <div className="flex items-center justify-center gap-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setLikes(Math.max(0, likes - 1))}
            className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition-colors duration-200"
          >
            <Minus className="w-5 h-5" />
          </motion.button>
          
          <motion.div
            key={likes}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-4xl font-bold text-neutral-800 min-w-[80px] text-center"
          >
            {likes}
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setLikes(likes + 1)}
            className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-200 transition-colors duration-200"
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl p-6 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-neutral-800">設定選項</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-700">通知</span>
                  <motion.button
                    onClick={() => setSwitchValue(!switchValue)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                      switchValue ? 'bg-primary-500' : 'bg-neutral-300'
                    }`}
                  >
                    <motion.span
                      animate={{ x: switchValue ? 20 : 2 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="inline-block h-4 w-4 rounded-full bg-white shadow-sm"
                    />
                  </motion.button>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-neutral-700">深色模式</span>
                  <motion.button
                    className="relative inline-flex h-6 w-11 items-center rounded-full bg-neutral-300 transition-colors duration-200"
                  >
                    <motion.span className="inline-block h-4 w-4 rounded-full bg-white shadow-sm transform translate-x-0.5" />
                  </motion.button>
                </div>
              </div>
              
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => {
                    showNotification('設定已保存！')
                    setIsModalOpen(false)
                  }}
                  className="btn-primary flex-1"
                >
                  保存
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary flex-1"
                >
                  取消
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rating */}
      <div className="card p-8">
        <h2 className="text-2xl font-bold text-neutral-800 mb-6">評分系統</h2>
        
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <motion.button
              key={rating}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="p-2"
            >
              <Star 
                className={`w-8 h-8 ${
                  rating <= 4 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-neutral-300'
                }`} 
              />
            </motion.button>
          ))}
        </div>
        
        <div className="text-center mt-4">
          <span className="text-neutral-600">4.0 / 5.0 (128 評價)</span>
        </div>
      </div>
    </div>
  )
}

export default InteractivePage 