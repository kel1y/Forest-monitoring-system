Forest Monitoring System
Overview

The Forest Monitoring System is a web-based platform designed to track forest coverage and loss using remote sensing data and machine learning. This system analyzes 60 years of forest evolution using satellite images, providing insights on land use, land cover (LULC) classification, and vegetation indices.

Forest Monitoring System Screenshot
Features

    Satellite Data Processing: Utilizes Landsat 5 and 7 images (30m resolution) for analysis.
    Cloud Removal: Implements noise reduction techniques for clearer imagery.
    LULC Classification: Uses the Random Forest algorithm to classify land use and land cover.
    Vegetation Health Monitoring: Calculates the Normalized Difference Vegetation Index (NDVI) to track vegetation health over time.
    Interactive Map: Displays classified regions with color-coding for different land types.
    Trend Analysis: Shows forest coverage trends over a 20-year period.
    Deforestation Insights: Provides patterns and insights into deforestation and reforestation.

Technology Stack

    Backend: Google Earth Engine for processing satellite data
    Frontend: Next.js for the web-based platform
    Machine Learning: Supervised classification using the Random Forest algorithm (75% accuracy)
    Visualization: React-Leaflet for maps, Chart.js for graphs

Getting Started
Prerequisites

    Node.js (v14 or later)
    npm or yarn
    Google Earth Engine account and API key

Installation

    Clone the repository:

    git clone https://github.com/yourusername/forest-monitoring-system.git
    cd forest-monitoring-system

    Install dependencies:

    npm install

    Set up environment variables: Create a .env.local file in the root directory and add your Google Earth Engine API key:

    GOOGLE_EARTH_ENGINE_API_KEY=your_api_key_here

    Run the development server:

    npm run dev

    Open http://localhost:3000 in your browser to see the application.

Usage

    View Classified Regions: The main map displays color-coded regions representing different land types (water bodies, forests, croplands, bare lands, built-up areas).

    Analyze Forest Coverage Trends: The graph shows forest coverage changes over the past 20 years.

    Explore Deforestation Patterns: Use the insights provided to understand patterns of deforestation and reforestation in specific areas.

Contributing

We welcome contributions to the Forest Monitoring System! Please follow these steps to contribute:

    Fork the repository
    Create a new branch (git checkout -b feature/AmazingFeature)
    Make your changes
    Commit your changes (git commit -m 'Add some AmazingFeature')
    Push to the branch (git push origin feature/AmazingFeature)
    Open a Pull Request

License

This project is licensed under the MIT License - see the LICENSE file for details.
Acknowledgments

    Landsat program for providing satellite imagery
    Google Earth Engine for satellite data processing capabilities
    OpenStreetMap for base map tiles

Contact

Irakoze Kelly- irakozekelly41@gmail.com

Project Link: https://github.com/kel1y/forest-monitoring-system
