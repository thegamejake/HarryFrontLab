import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, RotateCcw, Sparkles } from 'lucide-react'

const AnimationsPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [triggerAnimation, setTriggerAnimation] = useState(0)

  const resetAnimations = () => {
    setTriggerAnimation(prev => prev + 1)
  }

  return (
    <div className="space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-purple-100">
          <Sparkles className="w-6 h-6 text-purple-600" />
        </div>
        <h1 className="text-4xl font-bold text-neutral-800 mb-4">動畫效果展示</h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          探索 Framer Motion 和 CSS 動畫的各種可能性，從基礎動畫到複雜的互動效果
        </p>
      </motion.div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        <button
          onClick={resetAnimations}
          className="btn-primary"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          重置動畫
        </button>
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="btn-secondary"
        >
          <Play className="w-4 h-4 mr-2" />
          切換顯示
        </button>
      </div>

      {/* Animation Examples */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Fade In Animation */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">淡入動畫</h3>
          <motion.div
            key={`fade-${triggerAnimation}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="h-24 bg-blue-500 rounded-lg flex items-center justify-center text-white font-medium"
          >
            Fade In
          </motion.div>
        </div>

        {/* Slide Animation */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">滑動動畫</h3>
          <motion.div
            key={`slide-${triggerAnimation}`}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="h-24 bg-green-500 rounded-lg flex items-center justify-center text-white font-medium"
          >
            Slide In
          </motion.div>
        </div>

        {/* Scale Animation */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">縮放動畫</h3>
          <motion.div
            key={`scale-${triggerAnimation}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="h-24 bg-pink-500 rounded-lg flex items-center justify-center text-white font-medium"
          >
            Scale Up
          </motion.div>
        </div>

        {/* Rotation Animation */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">旋轉動畫</h3>
          <motion.div
            key={`rotate-${triggerAnimation}`}
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="h-24 bg-orange-500 rounded-lg flex items-center justify-center text-white font-medium"
          >
            Rotate
          </motion.div>
        </div>

        {/* Bounce Animation */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">彈跳動畫</h3>
          <motion.div
            key={`bounce-${triggerAnimation}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", bounce: 0.6 }}
            className="h-24 bg-purple-500 rounded-lg flex items-center justify-center text-white font-medium"
          >
            Bounce
          </motion.div>
        </div>

        {/* Complex Animation */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">複合動畫</h3>
          <motion.div
            key={`complex-${triggerAnimation}`}
            initial={{ 
              scale: 0,
              rotate: -180,
              borderRadius: "0%"
            }}
            animate={{ 
              scale: 1,
              rotate: 0,
              borderRadius: "12px"
            }}
            transition={{ 
              duration: 1.2,
              ease: "easeInOut"
            }}
            className="h-24 bg-cyan-500 flex items-center justify-center text-white font-medium"
          >
            Complex
          </motion.div>
        </div>
      </div>

      {/* Interactive Animations */}
      <div className="card p-8">
        <h2 className="text-2xl font-bold text-neutral-800 mb-6 text-center">互動動畫</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Hover Effects */}
          <motion.div
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
            }}
            whileTap={{ scale: 0.95 }}
            className="h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl cursor-pointer flex items-center justify-center text-white font-medium"
          >
            Hover Me
          </motion.div>

          <motion.div
            whileHover={{ 
              rotate: 10,
              transition: { duration: 0.2 }
            }}
            className="h-32 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl cursor-pointer flex items-center justify-center text-white font-medium"
          >
            Tilt Effect
          </motion.div>

          <motion.div
            whileHover={{ 
              y: -10,
              transition: { duration: 0.2 }
            }}
            className="h-32 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl cursor-pointer flex items-center justify-center text-white font-medium"
          >
            Lift Up
          </motion.div>

          <motion.div
            whileHover={{ 
              borderRadius: "50%",
              transition: { duration: 0.3 }
            }}
            className="h-32 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl cursor-pointer flex items-center justify-center text-white font-medium"
          >
            Shape Change
          </motion.div>
        </div>
      </div>

      {/* AnimatePresence Demo */}
      <div className="card p-8">
        <h2 className="text-2xl font-bold text-neutral-800 mb-6 text-center">進場離場動畫</h2>
        
        <div className="text-center mb-6">
          <button
            onClick={() => setIsVisible(!isVisible)}
            className="btn-primary"
          >
            {isVisible ? '隱藏' : '顯示'} 元素
          </button>
        </div>

        <div className="flex justify-center">
          <AnimatePresence>
            {isVisible && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ duration: 0.4 }}
                className="w-64 h-32 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-medium text-lg"
              >
                Hello, Framer Motion!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Stagger Animation */}
      <div className="card p-8">
        <h2 className="text-2xl font-bold text-neutral-800 mb-6 text-center">錯列動畫</h2>
        
        <motion.div 
          key={`stagger-${triggerAnimation}`}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
              className="h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center text-white font-medium"
            >
              {i + 1}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default AnimationsPage 