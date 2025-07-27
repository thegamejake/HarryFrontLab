import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AnimationsPage from './pages/AnimationsPage'
import ChartsPage from './pages/ChartsPage'
import ThreeDPage from './pages/ThreeDPage'
import InteractivePage from './pages/InteractivePage'
import CodeEditorPage from './pages/CodeEditorPage'
import LunchLotteryPage from './pages/LunchLotteryPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen gradient-bg">
        <Layout>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/animations" element={<AnimationsPage />} />
              <Route path="/charts" element={<ChartsPage />} />
              <Route path="/3d" element={<ThreeDPage />} />
              <Route path="/interactive" element={<InteractivePage />} />
              <Route path="/code-editor" element={<CodeEditorPage />} />
              <Route path="/lunch-lottery" element={<LunchLotteryPage />} />
            </Routes>
          </motion.div>
        </Layout>
      </div>
    </Router>
  )
}

export default App 