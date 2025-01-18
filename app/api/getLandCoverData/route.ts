import { NextResponse } from 'next/server'
import ee from '@google/earthengine'

export async function GET() {
  try {
    await ee.initialize({
      apiKey: process.env.GOOGLE_EARTH_ENGINE_API_KEY,
    })

    const landsat = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
      .filterDate('2023-01-01', '2023-12-31')
      .median()

    const classification = landsat.select(['B2', 'B3', 'B4', 'B5', 'B6', 'B7']).classify(
      ee.Classifier.randomForest().train({
        features: ee.FeatureCollection('GOOGLE/EE/DEMOS/demo_landcover_labels'),
        classProperty: 'landcover',
        inputProperties: ['B2', 'B3', 'B4', 'B5', 'B6', 'B7']
      })
    )

    const landCoverData = await classification.getInfo()

    // Ensure the data is in valid GeoJSON format
    const geoJsonData = {
      type: 'FeatureCollection',
      features: landCoverData.features.map(feature => ({
        type: 'Feature',
        geometry: feature.geometry,
        properties: {
          landcover: feature.properties.landcover
        }
      }))
    }

    return NextResponse.json(geoJsonData)
  } catch (error) {
    console.error('Error in getLandCoverData:', error)
    return NextResponse.json({ error: 'An error occurred while processing the request' }, { status: 500 })
  }
}

