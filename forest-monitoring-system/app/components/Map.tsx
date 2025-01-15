'use client'

import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export default function Map() {
  const [geoJsonData, setGeoJsonData] = useState(null)

  useEffect(() => {
    // Fetch GeoJSON data from our API
    fetch('/api/getClassifiedRegions')
      .then(response => response.json())
      .then(data => setGeoJsonData(data))
  }, [])

  return (
    <MapContainer center={[0, 0]} zoom={3} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {geoJsonData && (
        <GeoJSON 
          data={geoJsonData} 
          style={(feature) => ({
            fillColor: getColorForLandCover(feature.properties.landCover),
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

function getColorForLandCover(landCover) {
  switch (landCover) {
    case 'water': return 'red'
    case 'forest': return 'green'
    case 'cropland': return 'blue'
    case 'bareland': return 'purple'
    case 'builtup': return 'yellow'
    default: return 'gray'
  }
}

