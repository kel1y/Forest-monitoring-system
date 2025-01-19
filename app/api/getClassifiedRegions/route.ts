import { NextResponse } from 'next/server'
import ee from '@google/earthengine'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const region = searchParams.get('region')
  const year = searchParams.get('year')

  if (!region || !year) {
    return NextResponse.json({ error: 'Region and year are required parameters' }, { status: 400 })
  }

  try {
    // Initialize Earth Engine
    await ee.initialize()

    // Define region boundaries (you should replace these with more accurate coordinates)
    const regionBoundaries = {
      amazon: ee.Geometry.Rectangle([-75, -18, -44, 5]),
      congo: ee.Geometry.Rectangle([8, -5, 30, 5]),
      borneo: ee.Geometry.Rectangle([109, -4, 119, 7]),
      siberia: ee.Geometry.Rectangle([60, 50, 180, 75])
    }

    // Load Landsat image collection
    const collection = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
      .filterDate(`${year}-01-01`, `${year}-12-31`)
      .filterBounds(regionBoundaries[region])
      .median()

    // Perform cloud masking (simplified)
    const cloudMasked = collection.updateMask(collection.select('QA_PIXEL').bitwiseAnd(1 << 3).eq(0))

    // Perform classification (simplified)
    const classified = cloudMasked.select(['B2', 'B3', 'B4', 'B5', 'B6', 'B7'])
      .classify(ee.Classifier.randomForest().train({
        features: ee.FeatureCollection('GOOGLE/EE/DEMOS/demo_landcover_labels'),
        classProperty: 'landcover',
        inputProperties: ['B2', 'B3', 'B4', 'B5', 'B6', 'B7']
      }))

    // Get the results as GeoJSON
    const geojson = await classified.getInfo()

    if (!geojson) {
      throw new Error('Failed to retrieve GeoJSON data')
    }

    return NextResponse.json(geojson)
  } catch (error) {
    console.error('Error in getClassifiedRegions:', error)
    return NextResponse.json({ error: 'An error occurred while processing the request' }, { status: 500 })
  }
}

