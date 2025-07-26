import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Box, OrbitControls, Text } from '@react-three/drei'
import { motion } from 'framer-motion'
import { Box as BoxIcon, RotateCcw, Play } from 'lucide-react'
import { Mesh } from 'three'

// 旋轉立方體組件
const RotatingBox: React.FC<{ position: [number, number, number], color: string }> = ({ position, color }) => {
  const meshRef = useRef<Mesh>(null!)
  
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta
    meshRef.current.rotation.y += delta * 0.5
  })

  return (
    <Box ref={meshRef} position={position} args={[1, 1, 1]}>
      <meshStandardMaterial color={color} />
    </Box>
  )
}

// 浮動球體組件
const FloatingSphere: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<Mesh>(null!)
  
  useFrame((state) => {
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.5
    meshRef.current.rotation.x += 0.01
    meshRef.current.rotation.z += 0.01
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="#d946ef" wireframe />
    </mesh>
  )
}

// 3D 文字組件
const FloatingText: React.FC = () => {
  const textRef = useRef<any>(null!)
  
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
    }
  })

  return (
    <Text
      ref={textRef}
      position={[0, 2, 0]}
      fontSize={0.8}
      color="#0ea5e9"
      anchorX="center"
      anchorY="middle"
    >
      Harry Front Lab
    </Text>
  )
}

// 主場景組件
const Scene: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  return (
    <>
      {/* 環境光 */}
      <ambientLight intensity={0.5} />
      
      {/* 方向光 */}
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* 點光源 */}
      <pointLight position={[-10, -10, -10]} color="#d946ef" intensity={0.5} />
      
      {/* 3D 文字 */}
      <FloatingText />
      
      {/* 旋轉立方體 */}
      {isAnimating && (
        <>
          <RotatingBox position={[-2, 0, 0]} color="#0ea5e9" />
          <RotatingBox position={[2, 0, 0]} color="#eab308" />
          <RotatingBox position={[0, 0, -2]} color="#10b981" />
        </>
      )}
      
      {/* 浮動球體 */}
      <FloatingSphere position={[3, 0, 2]} />
      <FloatingSphere position={[-3, 0, 2]} />
      
      {/* 軌道控制器 */}
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
    </>
  )
}

const ThreeDPage: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(true)

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-green-100">
          <BoxIcon className="w-6 h-6 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold text-neutral-800 mb-4">3D 效果展示</h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          透過 Three.js 和 React Three Fiber 建立立體場景，體驗現代網頁的 3D 視覺效果
        </p>
      </motion.div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className="btn-primary"
        >
          <Play className="w-4 h-4 mr-2" />
          {isAnimating ? '暫停' : '播放'} 動畫
        </button>
        <button
          onClick={() => window.location.reload()}
          className="btn-secondary"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          重置場景
        </button>
      </div>

      {/* 3D Canvas */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="card p-4"
      >
        <div className="h-96 w-full rounded-lg overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
          <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
            <Scene isAnimating={isAnimating} />
          </Canvas>
        </div>
        
        <div className="mt-4 text-center text-sm text-neutral-600">
          <p>使用滑鼠拖拽旋轉視角，滾輪縮放，右鍵平移</p>
        </div>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-6"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <BoxIcon className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-800 mb-2">3D 幾何體</h3>
          <p className="text-neutral-600">
            展示各種 3D 幾何形狀，包括立方體、球體等基礎圖形
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6"
        >
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <RotateCcw className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-800 mb-2">動畫效果</h3>
          <p className="text-neutral-600">
            實時旋轉、浮動等動畫效果，展示 3D 場景的動態特性
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6"
        >
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <Play className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-800 mb-2">互動控制</h3>
          <p className="text-neutral-600">
            支援滑鼠和觸控操作，可以自由旋轉、縮放和平移 3D 場景
          </p>
        </motion.div>
      </div>

      {/* Technical Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card p-6"
      >
        <h3 className="text-xl font-semibold text-neutral-800 mb-4">技術實現</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-neutral-700 mb-2">使用技術</h4>
            <ul className="space-y-1 text-neutral-600">
              <li>• Three.js - 3D 圖形庫</li>
              <li>• React Three Fiber - React 整合</li>
              <li>• React Three Drei - 實用組件</li>
              <li>• WebGL - 硬體加速渲染</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-neutral-700 mb-2">特色功能</h4>
            <ul className="space-y-1 text-neutral-600">
              <li>• 即時 3D 渲染</li>
              <li>• 物理動畫系統</li>
              <li>• 光照和陰影效果</li>
              <li>• 響應式 3D 場景</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Code Example */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card p-6"
      >
        <h3 className="text-xl font-semibold text-neutral-800 mb-4">範例程式</h3>
        <div className="code-block">
          <pre>{`import { Canvas, useFrame } from '@react-three/fiber'
import { Box, OrbitControls } from '@react-three/drei'

const RotatingBox = () => {
  const meshRef = useRef()
  
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta
    meshRef.current.rotation.y += delta * 0.5
  })

  return (
    <Box ref={meshRef} args={[1, 1, 1]}>
      <meshStandardMaterial color="#0ea5e9" />
    </Box>
  )
}

<Canvas>
  <ambientLight intensity={0.5} />
  <directionalLight position={[10, 10, 5]} />
  <RotatingBox />
  <OrbitControls />
</Canvas>`}</pre>
        </div>
      </motion.div>
    </div>
  )
}

export default ThreeDPage 