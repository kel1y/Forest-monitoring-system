import { NextResponse } from 'next/server'
import ee from '@google/earthengine'

export async function GET() {
  // Initialize Earth Engine
  await ee.initialize()

  // Load Landsat image collection
  const collection = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
    .filterBounds(ee.Geometry.Rectangle(-180, -90, 180, 90))

  // Calculate forest coverage for each year (simplified)
  const forestCoverage = []
  for (let year = 2013; year <= 2022; year++) {
    const yearCollection = collection.filterDate(`${year}-01-01`, `${year}-12-31`).median()
    const ndvi = yearCollection.normalizedDifference(['B5', 'B4'])
    const forest = ndvi.gt(0.5)
    const forestArea = forest.multiply(ee.Image.pixelArea()).reduceRegion({
      reducer: ee.Reducer.sum(),
      geometry: ee.Geometry.Rectangle(-180, -90, 180, 90),
      scale: 30,
      maxPixels: 1e13
    })
    
    const coverage = await forestArea.get('nd').getInfo()
    forestCoverage.push({ year, coverage })
  }

  return NextResponse.json(forestCoverage)
}

