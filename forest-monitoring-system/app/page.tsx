import Map from './components/Map'
import ForestCoverageChart from './components/ForestCoverageChart'
import LegendBox from './components/LegendBox'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Forest Monitoring System</h1>
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <Map />
        <div>
          <ForestCoverageChart />
          <LegendBox />
        </div>
      </div>
    </main>
  )
}

