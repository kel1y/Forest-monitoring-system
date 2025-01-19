'use client'

import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, useMapEvents, Rectangle, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const regions = {
  amazon: [[-18, -75], [5, -44]],
  congo: [[-5, 8], [5, 30]],
  borneo: [[-4, 109], [7, 119]],
  siberia: [[50, 60], [75, 180]]
}

function RegionSelector({ onRegionSelect }) {
  const [selectedBounds, setSelectedBounds] = useState(null)

  useMapEvents({
    click: (e) => {
      const clickedPoint = [e.latlng.lat, e.latlng.lng]
      for (const [regionName, bounds] of Object.entries(regions)) {
        if (isPointInBounds(clickedPoint, bounds)) {
          setSelectedBounds(bounds)
          onRegionSelect(regionName)
          return
        }
      }
      setSelectedBounds(null)
      onRegionSelect(null)
    }
  })

  return selectedBounds ? (
    <Rectangle
      bounds={selectedBounds}
      pathOptions={{ color: 'red', weight: 2, fill: false }}
    />
  ) : null
}

function isPointInBounds(point, bounds) {
  return (
    point[0] >= bounds[0][0] && point[0] <= bounds[1][0] &&
    point[1] >= bounds[0][1] && point[1] <= bounds[1][1]
  )
}

export default function Map({ onRegionSelect }) {
  const [landCoverData, setLandCoverData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/getLandCoverData')
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          throw new Error(data.error)
        }
        if (data && data.type === 'FeatureCollection') {
          setLandCoverData(data)
        } else {
          throw new Error('Invalid GeoJSON data structure')
        }
      })
      .catch(error => {
        console.error('Error fetching land cover data:', error)
        setError(error.message)
      })
  }, [])

  function getColor(landCover) {
    switch (landCover) {
      case 'water': return 'blue'
      case 'forest': return 'green'
      case 'cropland': return 'yellow'
      case 'bareland': return 'brown'
      case 'builtup': return 'red'
      default: return 'gray'
    }
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>
  }

  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <RegionSelector onRegionSelect={onRegionSelect} />
      {landCoverData && (
        <GeoJSON 
          data={landCoverData} 
          style={(feature) => ({
            fillColor: getColor(feature.properties.landcover),
            weight: 1,
            opacity: 1,
            color: 'white',
            fillOpacity: 0.7
          })}
        />
      )}
    </MapContainer>
  )
}

