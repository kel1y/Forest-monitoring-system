'use client'

import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RegionSelector() {
  const [selectedRegion, setSelectedRegion] = useState('')

  const handleRegionChange = (value: string) => {
    setSelectedRegion(value)
    // TODO: Implement logic to update map and chart based on selected region
  }

  return (
    <div className="mb-4">
      <label htmlFor="region-select" className="block text-sm font-medium text-gray-700 mb-2">
        Select Region
      </label>
      <Select onValueChange={handleRegionChange} value={selectedRegion}>
        <SelectTrigger id="region-select">
          <SelectValue placeholder="Select a region" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="amazon">Amazon Rainforest</SelectItem>
          <SelectItem value="congo">Congo Basin</SelectItem>
          <SelectItem value="borneo">Borneo</SelectItem>
          <SelectItem value="siberia">Siberian Taiga</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

