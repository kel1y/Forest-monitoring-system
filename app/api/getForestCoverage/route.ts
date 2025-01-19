import { NextResponse } from 'next/server'
import ee from '@google/earthengine-api'
import privateKey from '../../utils/privateKey.json'

async function initialize() {
  return new Promise((resolve, reject) => {
    ee.data.authenticateViaPrivateKey(privateKey, () => {
      ee.initialize(null, null, () => {
        resolve()
      }, (err) => {
        reject(err)
      })
    }, (err) => {
      reject(err)
    })
  })
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const region = searchParams.get('region')
  const startYear = parseInt(searchParams.get('startYear') || '2013')
  const endYear = parseInt(searchParams.get('endYear') || '2023')

  if (!region) {
    return NextResponse.json({ error: 'Region is a required parameter' }, { status: 400 })
  }

  try {
    await initialize()

    const regionBoundaries = {
      amazon: ee.Geometry.Rectangle([-75, -18, -44, 5]),
      congo: ee.Geometry.Rectangle([8, -5, 30, 5]),
      borneo: ee.Geometry.Rectangle([109, -4, 119, 7]),
      siberia: ee.Geometry.Rectangle([60, 50, 180, 75])
    }

    const forestCoverage = []

    for (let year = startYear; year <= endYear; year++) {
      const landsat = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
        .filterDate(`${year}-01-01`, `${year}-12-31`)
        .filterBounds(regionBoundaries[region])
        .median()

      const ndvi = landsat.normalizedDifference(['B5', 'B4'])
      const forest = ndvi.gt(0.5)
      const forestArea = forest.multiply(ee.Image.pixelArea()).reduceRegion({
        reducer: ee.Reducer.sum(),
        geometry: regionBoundaries[region],
        scale: 30,
        maxPixels: 1e13
      })

      const coverage = await new Promise((resolve, reject) => {
        forestArea.get('nd').getInfo((data, err) => {
          if (err) {
            reject(err)
          } else {
            resolve(data)
          }
        })
      })

      forestCoverage.push({ year, coverage })
    }

    return NextResponse.json(forestCoverage)
  } catch (error) {
    console.error('Error in getForestCoverage:', error)
    return NextResponse.json({ error: error.message || 'An error occurred while processing the request' }, { status: 500 })
  }
}

