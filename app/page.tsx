'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import YearRangeSelector from './components/YearRangeSelector'
import ForestCoverageChart from './components/ForestCoverageChart'
import LegendBox from './components/LegendBox'

const Map = dynamic(() => import('./components/Map'), { ssr: false })

export default function Home() {
  const [selectedRegion, setSelectedRegion] = useState(null)
  const [yearRange, setYearRange] = useState([2013, 2023])
  const [showChart, setShowChart] = useState(false)

  const handleRegionSelect = (region) => {
    setSelectedRegion(region)
    setShowChart(false)
  }

  const handleYearRangeSubmit = (range) => {
    setYearRange(range)
    setShowChart(true)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Forest Monitoring System</h1>
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Map onRegionSelect={handleRegionSelect} />
          <YearRangeSelector onSubmit={handleYearRangeSubmit} />
        </div>
        <div>
          {showChart && selectedRegion && (
            <ForestCoverageChart selectedRegion={selectedRegion} yearRange={yearRange} />
          )}
          <LegendBox />
        </div>
      </div>
    </main>
  )
}

