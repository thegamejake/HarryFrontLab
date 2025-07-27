import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Dice6, MapPin, RefreshCw, ExternalLink, Navigation } from 'lucide-react'

const LunchLotteryPage: React.FC = () => {
  const [selectedFood, setSelectedFood] = useState<string | null>(null)
  const [isSpinning, setIsSpinning] = useState(false)
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null)
  const [locationStatus, setLocationStatus] = useState<'loading' | 'success' | 'error' | 'denied'>('loading')
  const [locationName, setLocationName] = useState<string>('取得位置中...')

  const foodOptions = [
    '中式餐廳',
    '日式料理',
    '韓式料理',
    '義式餐廳',
    '泰式料理',
    '越南料理',
    '印度料理',
    '美式漢堡',
    '小火鍋',
    '素食餐廳',
    '牛肉麵',
    '拉麵店',
    '便當店',
    '披薩店',
    '早午餐',
    '咖啡廳輕食'
  ]

  // 取得當前位置
  const getCurrentLocation = () => {
    setLocationStatus('loading')
    setLocationName('取得位置中...')

    if (!navigator.geolocation) {
      setLocationStatus('error')
      setLocationName('瀏覽器不支援定位功能')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setCurrentLocation({ lat: latitude, lng: longitude })
        setLocationStatus('success')
        setLocationName(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`)
      },
      (error) => {
        console.error('取得位置失敗:', error)
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationStatus('denied')
            setLocationName('位置權限被拒絕')
            break
          case error.POSITION_UNAVAILABLE:
            setLocationStatus('error')
            setLocationName('無法取得位置資訊')
            break
          case error.TIMEOUT:
            setLocationStatus('error')
            setLocationName('取得位置逾時')
            break
          default:
            setLocationStatus('error')
            setLocationName('取得位置發生錯誤')
            break
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 分鐘內的快取位置可接受
      }
    )
  }

  // 組件載入時自動取得位置
  useEffect(() => {
    getCurrentLocation()
  }, [])

  // 建立搜尋位置字串
  const getSearchLocation = () => {
    if (currentLocation) {
      return `${currentLocation.lat},${currentLocation.lng}`
    }
    return '台北市內湖區瑞光路583巷21號' // 預設位置
  }

  // 建立地圖URL
  const getMapUrl = (searchQuery: string) => {
    if (currentLocation) {
      // 使用座標中心點和搜尋查詢
      return `https://maps.google.com/maps?width=100%25&height=400&hl=zh-TW&q=${encodeURIComponent(searchQuery)}&ll=${currentLocation.lat},${currentLocation.lng}&t=&z=16&ie=UTF8&iwloc=&output=embed`
    } else {
      // 使用預設位置
      return `https://maps.google.com/maps?width=100%25&height=400&hl=zh-TW&q=${encodeURIComponent(searchQuery + ' near 台北市內湖區瑞光路583巷21號')}&t=&z=16&ie=UTF8&iwloc=&output=embed`
    }
  }

  const handleLottery = () => {
    if (isSpinning) return
    
    setIsSpinning(true)
    setSelectedFood(null)

    // 模擬抽獎動畫
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * foodOptions.length)
      setSelectedFood(foodOptions[randomIndex])
      setIsSpinning(false)
    }, 2000)
  }

  const resetLottery = () => {
    setSelectedFood(null)
    setIsSpinning(false)
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-primary-600 mb-4">
            美食迷宮飯
          </h1>
          <p className="text-lg text-neutral-600">
            不知道午餐吃什麼嗎？讓我們為您決定！
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 抽獎區域 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card"
          >
            <div className="text-center">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary-500 mb-6">
                  <Dice6 className={`w-12 h-12 text-white ${isSpinning ? 'animate-spin' : ''}`} />
                </div>
                
                {selectedFood ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mb-6"
                  >
                    <h2 className="text-3xl font-bold text-primary-600 mb-2">
                      🎉 恭喜！
                    </h2>
                    <div className="text-2xl font-semibold text-neutral-800 bg-yellow-100 px-6 py-3 rounded-lg inline-block">
                      {selectedFood}
                    </div>
                  </motion.div>
                ) : (
                  <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-neutral-700 mb-4">
                      {isSpinning ? '正在抽獎中...' : '準備好了嗎？'}
                    </h2>
                    {isSpinning && (
                      <div className="text-lg text-neutral-500">
                        讓命運為您選擇今天的美食！
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleLottery}
                  disabled={isSpinning}
                  className="btn btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Dice6 className={`w-5 h-5 mr-2 ${isSpinning ? 'animate-spin' : ''}`} />
                  {isSpinning ? '抽獎中...' : '開始抽獎'}
                </button>

                {selectedFood && (
                  <button
                    onClick={resetLottery}
                    className="btn btn-outline w-full"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    重新抽獎
                  </button>
                )}
              </div>

              {/* 選項預覽 */}
              <div className="mt-8 pt-6 border-t border-neutral-200">
                <h3 className="text-sm font-medium text-neutral-600 mb-3">
                  可抽中的美食選項：
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {foodOptions.slice(0, 8).map((food, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-neutral-100 text-neutral-600 rounded-md"
                    >
                      {food}
                    </span>
                  ))}
                  <span className="px-2 py-1 text-xs bg-neutral-100 text-neutral-600 rounded-md">
                    +{foodOptions.length - 8} 更多...
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Google 地圖內嵌區域 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card"
          >
            <div className="flex items-center mb-4">
              <MapPin className="w-5 h-5 text-primary-600 mr-2" />
              <h3 className="text-xl font-semibold">
                附近的{selectedFood || '餐廳'}搜尋
              </h3>
              {(locationStatus === 'error' || locationStatus === 'denied') && (
                <button
                  onClick={getCurrentLocation}
                  className="ml-auto text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  重新定位
                </button>
              )}
            </div>
            
            {/* 僅在定位失敗時顯示錯誤訊息 */}
            {(locationStatus === 'error' || locationStatus === 'denied') && (
              <div className="mb-4">
                <div className="p-3 rounded-lg text-sm bg-amber-50 text-amber-700 border border-amber-200">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {locationStatus === 'denied' ? 
                      '無法取得位置權限，將使用預設位置搜尋' : 
                      '定位失敗，將使用預設位置搜尋'
                    }
                  </div>
                </div>
              </div>
            )}
            
            <div className="relative">
              {selectedFood ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  {/* Google Maps 嵌入 */}
                  <div className="relative">
                    <iframe
                      src={getMapUrl(selectedFood + ' 餐廳')}
                      width="100%"
                      height="400"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg shadow-md"
                    />
                    {/* 地圖覆蓋層顯示搜尋內容 */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md">
                      <p className="text-sm font-medium text-neutral-800">
                        🍽️ 搜尋：{selectedFood}
                      </p>
                    </div>
                  </div>

                  {/* 地圖控制按鈕 */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => {
                        if (currentLocation) {
                          window.open(`https://www.google.com/maps/search/${encodeURIComponent(selectedFood + ' 餐廳')}/@${currentLocation.lat},${currentLocation.lng},16z`, '_blank')
                        } else {
                          window.open(`https://www.google.com/maps/search/${encodeURIComponent(selectedFood + ' 餐廳 near 台北市內湖區瑞光路583巷21號')}`, '_blank')
                        }
                      }}
                      className="btn btn-primary flex items-center justify-center px-6"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      在 Google 地圖中開啟
                    </button>
                  </div>

                  {/* 快捷搜尋詞 */}
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-neutral-700">
                        🔍 附近的更多搜尋選項：
                      </h4>
                      <button
                        onClick={() => {
                          const iframe = document.querySelector('iframe') as HTMLIFrameElement
                          if (iframe) {
                            iframe.src = getMapUrl(selectedFood + ' 餐廳')
                          }
                        }}
                        className="text-xs text-blue-600 hover:text-blue-800 underline"
                      >
                        🔄 重新載入地圖
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[`${selectedFood} 推薦`, `${selectedFood} 評價好`, `${selectedFood} 平價`, `${selectedFood} 外送`].map((keyword, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            const iframe = document.querySelector('iframe') as HTMLIFrameElement
                            if (iframe) {
                              iframe.src = getMapUrl(keyword)
                            }
                          }}
                          className="px-3 py-1 text-xs bg-white border border-neutral-300 rounded-full hover:bg-neutral-100 transition-colors"
                        >
                          {keyword}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 使用提示 */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-blue-800 mb-1">
                          💡 地圖使用說明
                        </h4>
                        <div className="text-sm text-blue-700 space-y-1">
                          <p>• 地圖會以您的當前位置為中心顯示搜尋結果</p>
                          <p>• 可以直接在地圖中縮放和拖曳查看更多餐廳</p>
                          <p>• 點擊地圖上的標記查看餐廳詳細資訊</p>
                          <p>• 使用上方按鈕可以在完整版地圖中開啟</p>
                          <p>• 點擊快捷搜尋詞可以切換不同的搜尋結果</p>
                          <p>• 若地圖顯示有問題，可點擊「重新載入地圖」</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="h-96 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <div className="text-center text-neutral-500">
                    <MapPin className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-lg font-medium mb-2">等待抽獎結果</p>
                    <p className="text-sm">抽中後會自動顯示您附近的 Google 地圖搜尋結果</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default LunchLotteryPage 