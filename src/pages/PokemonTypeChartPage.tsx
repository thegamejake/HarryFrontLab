import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, RefreshCw, Info, ChevronDown, ChevronUp } from 'lucide-react'

interface DamageRelations {
  double_damage_to: { name: string; url: string }[]
  half_damage_to: { name: string; url: string }[]
  no_damage_to: { name: string; url: string }[]
  double_damage_from: { name: string; url: string }[]
  half_damage_from: { name: string; url: string }[]
  no_damage_from: { name: string; url: string }[]
}

interface TypeData {
  name: string
  damage_relations: DamageRelations
}

interface PokemonType {
  name: string
  url: string
}

interface Pokemon {
  name: string
  types: { type: PokemonType }[]
  sprites: { front_default: string | null }
}

const TYPE_COLORS: Record<string, string> = {
  normal: '#A8A878', fire: '#F08030', water: '#6890F0', electric: '#F8D030',
  grass: '#78C850', ice: '#98D8D8', fighting: '#C03028', poison: '#A040A0',
  ground: '#E0C068', flying: '#A890F0', psychic: '#F85888', bug: '#A8B820',
  rock: '#B8A038', ghost: '#705898', dragon: '#7038F8', dark: '#705848',
  steel: '#B8B8D0', fairy: '#EE99AC'
}

const TYPE_NAMES_ZH: Record<string, string> = {
  normal: '一般', fire: '火', water: '水', electric: '電', grass: '草', ice: '冰',
  fighting: '格鬥', poison: '毒', ground: '地面', flying: '飛行', psychic: '超能力',
  bug: '蟲', rock: '岩石', ghost: '幽靈', dragon: '龍', dark: '惡',
  steel: '鋼', fairy: '妖精'
}

const ALL_TYPES = Object.keys(TYPE_COLORS)

const PokemonTypeChartPage: React.FC = () => {
  const [typesData, setTypesData] = useState<Record<string, TypeData>>({})
  const [loading, setLoading] = useState(true)
  const [selectedAttackType, setSelectedAttackType] = useState<string | null>(null)
  const [selectedDefenseTypes, setSelectedDefenseTypes] = useState<string[]>([])
  const [pokemonName, setPokemonName] = useState('')
  const [searchingPokemon, setSearchingPokemon] = useState(false)
  const [foundPokemon, setFoundPokemon] = useState<Pokemon | null>(null)
  const [pokemonError, setPokemonError] = useState<string | null>(null)
  const [showChart, setShowChart] = useState(true)

  useEffect(() => {
    fetchAllTypes()
  }, [])

  const fetchAllTypes = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/type')
      const data = await response.json()
      const typePromises = data.results
        .filter((t: any) => ALL_TYPES.includes(t.name))
        .map(async (type: any) => fetch(type.url).then(res => res.json()))
      
      const typeDataArray = await Promise.all(typePromises)
      const typeDataMap: Record<string, TypeData> = {}
      typeDataArray.forEach((typeData) => {
        typeDataMap[typeData.name] = typeData
      })
      setTypesData(typeDataMap)
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch types:', error)
      setLoading(false)
    }
  }

  const calculateEffectiveness = (attackType: string, defenseTypes: string[]): number => {
    let effectiveness = 1
    defenseTypes.forEach(defType => {
      const defData = typesData[defType]
      if (!defData) return
      
      if (defData.damage_relations.double_damage_from.some(t => t.name === attackType)) {
        effectiveness *= 2
      } else if (defData.damage_relations.half_damage_from.some(t => t.name === attackType)) {
        effectiveness *= 0.5
      } else if (defData.damage_relations.no_damage_from.some(t => t.name === attackType)) {
        effectiveness *= 0
      }
    })
    return effectiveness
  }

  const getDefenseEffectiveness = (defenseTypes: string[]) => {
    const effectiveness: Record<string, number> = {}
    ALL_TYPES.forEach(attackType => {
      effectiveness[attackType] = calculateEffectiveness(attackType, defenseTypes)
    })
    return effectiveness
  }

  const searchPokemon = async () => {
    if (!pokemonName.trim()) return
    setSearchingPokemon(true)
    setPokemonError(null)
    setFoundPokemon(null)
    
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase().trim()}`)
      if (!response.ok) throw new Error('寶可夢未找到')
      const data = await response.json()
      setFoundPokemon(data)
      setSelectedDefenseTypes(data.types.map((t: any) => t.type.name))
    } catch (error) {
      setPokemonError('找不到這個寶可夢，請確認名稱是否正確')
    } finally {
      setSearchingPokemon(false)
    }
  }

  const toggleDefenseType = (type: string) => {
    setSelectedDefenseTypes(prev => {
      if (prev.includes(type)) {
        return prev.filter(t => t !== type)
      } else if (prev.length < 2) {
        return [...prev, type]
      }
      return prev
    })
  }

  const getEffectivenessColor = (effectiveness: number) => {
    if (effectiveness === 0) return 'bg-gray-800 text-white'
    if (effectiveness === 0.25) return 'bg-green-200 text-green-800'
    if (effectiveness === 0.5) return 'bg-green-100 text-green-700'
    if (effectiveness === 2) return 'bg-orange-100 text-orange-700'
    if (effectiveness === 4) return 'bg-red-200 text-red-800'
    return 'bg-white text-gray-700'
  }

  const getEffectivenessLabel = (effectiveness: number) => {
    if (effectiveness === 0) return '無效'
    if (effectiveness === 0.25) return '¼×'
    if (effectiveness === 0.5) return '½×'
    if (effectiveness === 2) return '2×'
    if (effectiveness === 4) return '4×'
    return '1×'
  }

  const defenseEffectiveness = selectedDefenseTypes.length > 0 
    ? getDefenseEffectiveness(selectedDefenseTypes)
    : {}

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-lg text-neutral-600">載入寶可夢屬性資料中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-primary-600 mb-4">
            寶可夢屬性相剋表
          </h1>
          <p className="text-lg text-neutral-600">
            使用 PokéAPI 製作的屬性相剋計算器
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card p-8"
          >
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Search className="w-5 h-5 mr-2 text-primary-600" />
                寶可夢搜尋
              </h3>
              
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={pokemonName}
                  onChange={(e) => setPokemonName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && searchPokemon()}
                  placeholder="輸入寶可夢名稱 (英文)"
                  className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  onClick={searchPokemon}
                  disabled={searchingPokemon}
                  className="btn btn-primary px-4 py-2 disabled:opacity-50"
                >
                  {searchingPokemon ? '搜尋中...' : '搜尋'}
                </button>
              </div>

              {pokemonError && (
                <div className="p-3 bg-red-50 text-red-700 rounded-lg mb-4">
                  {pokemonError}
                </div>
              )}

              {foundPokemon && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-neutral-50 rounded-lg p-6 mb-8"
                >
                  <div className="flex items-center gap-4">
                    {foundPokemon.sprites.front_default && (
                      <img
                        src={foundPokemon.sprites.front_default}
                        alt={foundPokemon.name}
                        className="w-24 h-24"
                      />
                    )}
                    <div>
                      <h4 className="text-xl font-bold capitalize">{foundPokemon.name}</h4>
                      <div className="flex gap-2 mt-3">
                        {foundPokemon.types.map((t, i) => (
                          <span
                            key={i}
                            className="px-4 py-2 rounded-full text-white text-sm"
                            style={{ backgroundColor: TYPE_COLORS[t.type.name] }}
                          >
                            {TYPE_NAMES_ZH[t.type.name]}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Info className="w-5 h-5 mr-2 text-primary-600" />
                選擇防禦屬性（最多2個）
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {ALL_TYPES.map(type => (
                  <button
                    key={type}
                    onClick={() => toggleDefenseType(type)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 text-white text-sm
                    ${selectedDefenseTypes.includes(type) ? 'ring-4 ring-yellow-400 scale-105' : 'hover:scale-105'}`}
                    style={{ backgroundColor: TYPE_COLORS[type] }}
                  >
                    {TYPE_NAMES_ZH[type]}
                  </button>
                ))}
              </div>
              {selectedDefenseTypes.length > 0 && (
                <button
                  onClick={() => setSelectedDefenseTypes([])}
                  className="btn btn-outline text-sm"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  清除選擇
                </button>
              )}
            </div>

            {selectedDefenseTypes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-neutral-50 rounded-lg p-6"
              >
                <h4 className="font-semibold mb-4">屬性相剋結果：</h4>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(defenseEffectiveness)
                    .filter(([_, eff]) => eff !== 1)
                    .sort((a, b) => b[1] - a[1])
                    .map(([type, effectiveness]) => (
                      <div
                        key={type}
                        className={`flex justify-between items-center px-4 py-3 rounded-lg ${getEffectivenessColor(effectiveness)}`}
                      >
                        <span className="font-medium">{TYPE_NAMES_ZH[type]}</span>
                        <span className="font-bold text-lg">{getEffectivenessLabel(effectiveness)}</span>
                      </div>
                    ))}
                  {Object.values(defenseEffectiveness).every(eff => eff === 1) && (
                    <p className="text-neutral-500 col-span-2 py-3">所有屬性都是正常傷害</p>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold flex items-center">
              <Info className="w-5 h-5 mr-2 text-primary-600" />
              屬性相剋圖表
            </h3>
              <button
                onClick={() => setShowChart(!showChart)}
                className="text-sm text-neutral-600 hover:text-primary-600"
              >
                {showChart ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
            </div>

            {showChart && (
              <>
                <div className="mb-6">
                  <h4 className="font-medium mb-3">選擇攻擊屬性：</h4>
                  <div className="flex flex-wrap gap-2">
                    {ALL_TYPES.map(type => (
                      <button
                        key={type}
                        onClick={() => setSelectedAttackType(type)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 text-white text-sm
                        ${selectedAttackType === type ? 'ring-4 ring-yellow-400 scale-105' : 'hover:scale-105'}`}
                        style={{ backgroundColor: TYPE_COLORS[type] }}
                      >
                        {TYPE_NAMES_ZH[type]}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedAttackType && typesData[selectedAttackType] && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <h4 className="font-semibold text-red-700 mb-3">雙倍克制 (2×)</h4>
                      <div className="flex flex-wrap gap-2">
                        {typesData[selectedAttackType].damage_relations.double_damage_to
                          .filter(t => ALL_TYPES.includes(t.name))
                          .map(t => (
                            <span
                              key={t.name}
                              className="px-3 py-1 rounded-lg text-white text-sm"
                              style={{ backgroundColor: TYPE_COLORS[t.name] }}
                            >
                              {TYPE_NAMES_ZH[t.name]}
                            </span>
                          ))}
                        {typesData[selectedAttackType].damage_relations.double_damage_to.filter(t => ALL_TYPES.includes(t.name)).length === 0 && (
                          <span className="text-neutral-500">無</span>
                        )}
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h4 className="font-semibold text-green-700 mb-3">被抵抗 (½×)</h4>
                      <div className="flex flex-wrap gap-2">
                        {typesData[selectedAttackType].damage_relations.half_damage_to
                          .filter(t => ALL_TYPES.includes(t.name))
                          .map(t => (
                            <span
                              key={t.name}
                              className="px-3 py-1 rounded-lg text-white text-sm"
                              style={{ backgroundColor: TYPE_COLORS[t.name] }}
                            >
                              {TYPE_NAMES_ZH[t.name]}
                            </span>
                          ))}
                        {typesData[selectedAttackType].damage_relations.half_damage_to.filter(t => ALL_TYPES.includes(t.name)).length === 0 && (
                          <span className="text-neutral-500">無</span>
                        )}
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-700 mb-3">無效 (0×)</h4>
                      <div className="flex flex-wrap gap-2">
                        {typesData[selectedAttackType].damage_relations.no_damage_to
                          .filter(t => ALL_TYPES.includes(t.name))
                          .map(t => (
                            <span
                              key={t.name}
                              className="px-3 py-1 rounded-lg text-white text-sm"
                              style={{ backgroundColor: TYPE_COLORS[t.name] }}
                            >
                              {TYPE_NAMES_ZH[t.name]}
                            </span>
                          ))}
                        {typesData[selectedAttackType].damage_relations.no_damage_to.filter(t => ALL_TYPES.includes(t.name)).length === 0 && (
                          <span className="text-neutral-500">無</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default PokemonTypeChartPage
