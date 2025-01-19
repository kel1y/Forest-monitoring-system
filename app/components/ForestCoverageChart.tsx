'use client'

import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function ForestCoverageChart({ selectedRegion, yearRange }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Forest Coverage',
        data: [],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  })
  const [error, setError] = useState(null)

  useEffect(() => {
    if (selectedRegion && yearRange) {
      fetch(`/api/getForestCoverage?region=${selectedRegion}&startYear=${yearRange[0]}&endYear=${yearRange[1]}`)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            throw new Error(data.error)
          }
          setChartData({
            labels: data.map(d => d.year),
            datasets: [{
              ...chartData.datasets[0],
              data: data.map(d => d.coverage)
            }]
          })
        })
        .catch(error => {
          console.error('Error fetching forest coverage:', error)
          setError(error.message)
        })
    }
  }, [selectedRegion, yearRange])

  if (error) {
    return <div className="error-message">Error: {error}</div>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Forest Coverage Trend for {selectedRegion}</h2>
      <Line data={chartData} />
    </div>
  )
}

