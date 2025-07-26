import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Editor, { OnMount } from '@monaco-editor/react'
import { 
  Code2, 
  Play, 
  Download, 
  Copy, 
  RotateCcw,
  Settings,
  FileCode,
  Palette
} from 'lucide-react'

const CodeEditorPage: React.FC = () => {
  const [code, setCode] = useState(`// Welcome to Harry Front Lab Code Editor!
// 歡迎使用 Harry Front Lab 程式編輯器！

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const HelloWorld: React.FC = () => {
  const [message, setMessage] = useState('Hello, World!')
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleClick = () => {
    setMessage(message === 'Hello, World!' 
      ? '你好，世界！' 
      : 'Hello, World!')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 text-center"
    >
      <h1 className="text-3xl font-bold mb-4">
        {message}
      </h1>
      
      <p className="text-lg text-gray-600 mb-6">
        計數器：{count}
      </p>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg 
                   hover:bg-blue-600 transition-colors duration-200"
      >
        切換語言
      </motion.button>
    </motion.div>
  )
}

export default HelloWorld`)

  const [language, setLanguage] = useState('typescript')
  const [theme, setTheme] = useState('vs-dark')
  const [fontSize, setFontSize] = useState(14)
  const [output, setOutput] = useState('')
  const editorRef = useRef<any>(null)

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor
    
    // 設置編輯器選項
    editor.updateOptions({
      minimap: { enabled: true },
      fontSize: fontSize,
      wordWrap: 'on',
      automaticLayout: true,
      scrollBeyondLastLine: false,
      smoothScrolling: true,
      cursorBlinking: 'smooth',
      renderLineHighlight: 'gutter',
    })

    // 自定義主題 - 更有特色的 Harry 主題
    monaco.editor.defineTheme('harry-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '7C3AED', fontStyle: 'italic' }, // 紫色註解
        { token: 'keyword', foreground: '06B6D4' }, // 青色關鍵字
        { token: 'string', foreground: '#10B981' }, // 綠色字串
        { token: 'number', foreground: '#F59E0B' }, // 橙色數字
        { token: 'variable', foreground: '#EC4899' }, // 粉色變數
        { token: 'function', foreground: '#8B5CF6' }, // 紫色函數
        { token: 'type', foreground: '#06B6D4' }, // 青色類型
      ],
      colors: {
        'editor.background': '#0F0F23', // 深紫藍背景
        'editor.foreground': '#E2E8F0', // 亮灰前景
        'editorLineNumber.foreground': '#7C3AED', // 紫色行號
        'editor.selectionBackground': '#374151', // 灰色選取
        'editor.lineHighlightBackground': '#1E1B4B', // 深紫高亮行
        'editorCursor.foreground': '#06B6D4', // 青色游標
        'editor.findMatchBackground': '#7C3AED40', // 紫色搜尋高亮
        'editor.findMatchHighlightBackground': '#7C3AED20',
      }
    })

    monaco.editor.defineTheme('harry-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '#8B5A3C', fontStyle: 'italic' }, // 棕色註解
        { token: 'keyword', foreground: '#BE185D' }, // 深粉關鍵字
        { token: 'string', foreground: '#047857' }, // 深綠字串
        { token: 'number', foreground: '#DC2626' }, // 紅色數字
        { token: 'variable', foreground: '#7C2D12' }, // 棕紅變數
        { token: 'function', foreground: '#5B21B6' }, // 深紫函數
        { token: 'type', foreground: '#BE185D' }, // 深粉類型
      ],
      colors: {
        'editor.background': '#FFF8F0', // 溫暖奶茶背景
        'editor.foreground': '#1C1917', // 深棕前景
        'editorLineNumber.foreground': '#BE185D', // 深粉行號
        'editor.selectionBackground': '#FDE68A', // 黃色選取
        'editor.lineHighlightBackground': '#FEF3C7', // 淺黃高亮行
        'editorCursor.foreground': '#BE185D', // 深粉游標
        'editor.findMatchBackground': '#BE185D40', // 粉色搜尋高亮
        'editor.findMatchHighlightBackground': '#BE185D20',
      }
    })
  }

  const languages = [
    { value: 'typescript', label: 'TypeScript' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'json', label: 'JSON' },
    { value: 'markdown', label: 'Markdown' },
  ]

  const themes = [
    { value: 'vs-dark', label: '深色主題' },
    { value: 'vs', label: '淺色主題' },
    { value: 'harry-dark', label: 'Harry 深色' },
    { value: 'harry-light', label: 'Harry 淺色' },
  ]

  const codeTemplates = {
    typescript: `// TypeScript 範例
interface User {
  id: number
  name: string
  email: string
}

const user: User = {
  id: 1,
  name: 'Harry',
  email: 'harry@example.com'
}

function greetUser(user: User): string {
  return \`Hello, \${user.name}!\`
}

console.log(greetUser(user))`,

    javascript: `// JavaScript 範例
const users = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 35 }
]

const youngUsers = users
  .filter(user => user.age < 30)
  .map(user => user.name)

console.log('年輕用戶:', youngUsers)`,

    html: `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Harry Front Lab</title>
  <style>
    body {
      font-family: 'Inter', sans-serif;
      margin: 0;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>歡迎來到前端實驗室</h1>
    <p>這裡是學習和測試前端技術的地方。</p>
  </div>
</body>
</html>`,

    css: `/* 現代 CSS 樣式 */
:root {
  --primary: #0ea5e9;
  --secondary: #d946ef;
  --accent: #eab308;
  --neutral: #737373;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover {
  background: #0284c7;
  transform: scale(1.05);
}`,

    json: `{
  "name": "harry-front-lab",
  "version": "1.0.0",
  "description": "前端技術實驗室",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^10.16.16",
    "tailwindcss": "^3.3.6"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.2.2",
    "vite": "^5.0.8"
  }
}`,

    markdown: `# Harry Front Lab 📚

> 一個展示各種前端技術的現代化實驗室

## 🚀 特色功能

- **動畫效果** - Framer Motion 動畫展示
- **圖表視覺化** - Recharts 數據圖表
- **3D 效果** - Three.js 立體場景
- **互動元件** - 現代 UI 組件
- **程式編輯器** - Monaco Editor 整合

## 💻 技術堆疊

| 技術 | 描述 |
|------|------|
| React 18 | 現代化 UI 框架 |
| TypeScript | 型別安全開發 |
| Vite | 極速構建工具 |
| Tailwind CSS | 實用優先的 CSS 框架 |

## 🎨 設計特色

- 輕盈現代的配色方案
- 響應式設計
- 玻璃質感效果
- 流暢的動畫過渡

## 📦 安裝與運行

\`\`\`bash
# 安裝依賴
npm install

# 啟動開發服務器
npm run dev

# 構建生產版本
npm run build
\`\`\`

---

*Happy Coding! 🎉*`
  }

  const runCode = () => {
    setOutput('程式執行功能在真實環境中需要後端支持 🚀')
    setTimeout(() => setOutput(''), 3000)
  }

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setOutput('程式已複製到剪貼板 📋')
      setTimeout(() => setOutput(''), 2000)
    } catch (err) {
      setOutput('複製失败')
    }
  }

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `code.${language === 'typescript' ? 'ts' : language === 'javascript' ? 'js' : language}`
    a.click()
    URL.revokeObjectURL(url)
    setOutput('程式已下載 💾')
    setTimeout(() => setOutput(''), 2000)
  }

  const resetCode = () => {
    const template = codeTemplates[language as keyof typeof codeTemplates]
    if (template) {
      setCode(template)
      setOutput('程式已重置 🔄')
      setTimeout(() => setOutput(''), 2000)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-red-100">
          <Code2 className="w-6 h-6 text-red-600" />
        </div>
        <h1 className="text-4xl font-bold text-neutral-800 mb-4">程式編輯器</h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          整合 Monaco Editor 的線上程式編輯環境，支援多種程式語言和主題
        </p>
      </motion.div>

      {/* Controls */}
      <div className="card p-6">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-neutral-600" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="input py-2 min-w-[120px]"
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-neutral-600" />
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="input py-2 min-w-[120px]"
            >
              {themes.map((themeOption) => (
                <option key={themeOption.value} value={themeOption.value}>
                  {themeOption.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-neutral-600" />
            <input
              type="range"
              min="12"
              max="24"
              value={fontSize}
              onChange={(e) => {
                setFontSize(Number(e.target.value))
                if (editorRef.current) {
                  editorRef.current.updateOptions({ fontSize: Number(e.target.value) })
                }
              }}
              className="w-20"
            />
            <span className="text-sm text-neutral-600">{fontSize}px</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button onClick={runCode} className="btn-primary flex items-center gap-2">
            <Play className="w-4 h-4" />
            執行
          </button>
          <button onClick={copyCode} className="btn-secondary flex items-center gap-2">
            <Copy className="w-4 h-4" />
            複製
          </button>
          <button onClick={downloadCode} className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            下載
          </button>
          <button onClick={resetCode} className="btn-secondary flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            重置
          </button>
        </div>
      </div>

      {/* Editor */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-4"
      >
        <div className="h-96 border border-neutral-200 rounded-lg overflow-hidden">
          <Editor
            height="100%"
            language={language}
            value={code}
            onChange={(value) => setCode(value || '')}
            onMount={handleEditorDidMount}
            theme={theme}
            options={{
              selectOnLineNumbers: true,
              roundedSelection: false,
              readOnly: false,
              cursorStyle: 'line',
              automaticLayout: true,
              glyphMargin: false,
              folding: true,
              lineNumbersMinChars: 4,
              lineDecorationsWidth: 0,
              lineNumbers: 'on',
              scrollbar: {
                vertical: 'auto',
                horizontal: 'auto',
                useShadows: false,
                verticalHasArrows: false,
                horizontalHasArrows: false,
                verticalScrollbarSize: 8,
                horizontalScrollbarSize: 8
              }
            }}
          />
        </div>
      </motion.div>

      {/* Output */}
      {output && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-4"
        >
          <h3 className="text-lg font-semibold text-neutral-800 mb-2">輸出</h3>
          <div className="bg-neutral-900 text-green-400 p-4 rounded-lg font-mono text-sm">
            {output}
          </div>
        </motion.div>
      )}

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <Code2 className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-800 mb-2">語法高亮</h3>
          <p className="text-neutral-600">
            支援多種程式語言的語法高亮顯示，提供優質的程式閱讀體驗
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-6"
        >
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <Palette className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-800 mb-2">多重主題</h3>
          <p className="text-neutral-600">
            內建多種編輯器主題，包括深色、淺色及自定義主題選項
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card p-6"
        >
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <Settings className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-800 mb-2">自定義設定</h3>
          <p className="text-neutral-600">
            可調整字體大小、編輯器選項等，打造個人化的編程環境
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default CodeEditorPage 