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

export async function GET() {
  try {
    await initialize()

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

    const landCoverData = await new Promise((resolve, reject) => {
      classification.getInfo((data, err) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })

    if (!landCoverData || !landCoverData.features) {
      throw new Error('Invalid data received from Earth Engine')
    }

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
    return NextResponse.json({ error: error.message || 'An error occurred while processing the request' }, { status: 500 })
  }
}

