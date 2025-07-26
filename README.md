# Harry Front Lab 🚀

> 一個展示各種前端技術的現代化實驗室網站

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.8-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.6-cyan.svg)](https://tailwindcss.com/)

## 📸 預覽

這是一個用於測試和展示各種前端技術的現代化網站，採用輕盈的設計風格和豐富的互動效果。

## 特色功能

### 動畫效果
- **Framer Motion** 驅動的流暢動畫
- 淡入、滑動、縮放、旋轉等多種動畫類型
- 互動式動畫效果
- 進場離場動畫
- 錯列動畫展示

### 圖表展示
- **Recharts** 數據視覺化
- 線性圖表、柱狀圖表、圓餅圖表
- 區域圖表、雷達圖表
- 響應式設計
- 互動式圖表元素

### 3D 效果
- **Three.js + React Three Fiber** 3D 場景
- 立體幾何圖形展示
- 實時動畫效果
- 軌道控制器互動
- 光照和材質效果

### 互動元件
- 現代化 UI 組件
- 動態按鈕和開關
- 摺疊面板 (Accordion)
- 滑動控制器
- 模態對話框
- 通知系統

### 程式編輯器
- **Monaco Editor** 整合
- 多種程式語言支援
- 語法高亮顯示
- 多重主題選擇
- 程式下載和複製功能

## 🛠 技術堆疊

| 技術 | 版本 | 描述 |
|------|------|------|
| **React** | 18.2.0 | 現代化 UI 框架 |
| **TypeScript** | 5.2.2 | 型別安全的 JavaScript |
| **Vite** | 5.0.8 | 極速前端建置工具 |
| **Tailwind CSS** | 3.3.6 | 實用優先的 CSS 框架 |
| **Framer Motion** | 10.16.16 | React 動畫庫 |
| **Recharts** | 2.8.0 | React 圖表庫 |
| **Three.js** | 0.158.0 | 3D 圖形庫 |
| **React Three Fiber** | 8.15.12 | Three.js 的 React 整合 |
| **Monaco Editor** | 0.44.0 | 線上程式編輯器 |
| **Lucide React** | 0.294.0 | 現代圖示庫 |

## 設計特色

- **輕盈現代配色** - 藍色系主色調搭配輕盈的漸變效果
- **玻璃質感** - 毛玻璃背景模糊效果
- **響應式設計** - 適配桌面、平板、手機等各種裝置
- **流暢動畫** - 豐富的過渡動畫和互動反饋
- **現代字體** - Inter 字體家族提供優質閱讀體驗

## 快速開始

### 前置需求

- Node.js 16.0 或更高版本
- npm 7.0 或更高版本

### 安裝與運行

```bash
# 1. 克隆專案
git clone <repository-url>
cd HarryFrontLab

# 2. 安裝依賴
npm install

# 3. 啟動開發服務器
npm run dev

# 4. 打開瀏覽器訪問
# http://localhost:5173
```

### 建置指令

```bash
# 開發模式
npm run dev

# 型別檢查
npm run lint

# 生產建置
npm run build

# 預覽建置結果
npm run preview
```

## 專案結構

```
HarryFrontLab/
├── public/                 # 靜態資源
├── src/
│   ├── components/         # 共用組件
│   │   └── Layout.tsx      # 主要佈局組件
│   ├── pages/              # 頁面組件
│   │   ├── HomePage.tsx    # 首頁
│   │   ├── AnimationsPage.tsx    # 動畫展示
│   │   ├── ChartsPage.tsx        # 圖表展示
│   │   ├── ThreeDPage.tsx        # 3D 效果
│   │   ├── InteractivePage.tsx   # 互動元件
│   │   └── CodeEditorPage.tsx    # 程式編輯器
│   ├── App.tsx             # 主應用組件
│   ├── main.tsx            # 應用入口
│   └── index.css           # 全域樣式
├── index.html              # HTML 模板
├── package.json            # 專案配置
├── tailwind.config.js      # Tailwind 配置
├── tsconfig.json           # TypeScript 配置
├── vite.config.ts          # Vite 配置
└── README.md               # 專案說明
```

## 功能頁面

### 首頁 (/)
- 專案介紹和概覽
- 功能特色展示
- 技術堆疊說明
- 導航入口

### 動畫效果 (/animations)
- Framer Motion 動畫示例
- 各種動畫類型展示
- 互動動畫效果
- 動畫控制選項

### 圖表展示 (/charts)
- 多種圖表類型
- 響應式數據視覺化
- 互動式圖表元素
- 圖表切換功能

### 3D 效果 (/3d)
- Three.js 3D 場景
- 立體幾何圖形
- 實時動畫渲染
- 視角控制互動

### 互動元件 (/interactive)
- 現代 UI 組件
- 表單控制元件
- 模態對話框
- 通知系統

### 程式編輯器 (/code-editor)
- Monaco Editor 整合
- 多語言支援
- 主題切換
- 程式操作功能

## 自定義主題

專案採用 Tailwind CSS 的自定義主題系統：

```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: {
        // 藍色系主色調
        50: '#f0f9ff',
        500: '#0ea5e9',
        600: '#0284c7',
        // ...
      },
      secondary: {
        // 黃色系輔助色
        // ...
      },
      accent: {
        // 紫色系強調色
        // ...
      }
    }
  }
}
```

## 🔧 開發指南

### 新增頁面

1. 在 `src/pages/` 建立新的頁面組件
2. 在 `src/App.tsx` 新增路由配置
3. 在導航選單中新增連結

### 自定義樣式

專案使用 Tailwind CSS，可以透過以下方式自定義：

1. 修改 `tailwind.config.js` 調整主題
2. 在 `src/index.css` 新增全域樣式
3. 使用 `@layer` 指令組織樣式層級

### 新增動畫

使用 Framer Motion 新增動畫效果：

```typescript
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  內容
</motion.div>
```

## 響應式設計

專案採用 Mobile-First 設計原則：

- **手機** (< 768px): 單欄佈局
- **平板** (768px - 1024px): 雙欄佈局
- **桌面** (> 1024px): 多欄佈局

## 最佳實踐

- **組件化開發** - 將 UI 拆分為可重用的組件
- **型別安全** - 使用 TypeScript 確保程式品質
- **效能優化** - 懶加載和程式分割
- **無障礙設計** - 支援鍵盤導航和螢幕閱讀器
- **跨瀏覽器相容** - 現代瀏覽器完全支援

## 授權條款

本專案採用 MIT 授權條款 - 查看 [LICENSE](LICENSE) 檔案了解詳情。
