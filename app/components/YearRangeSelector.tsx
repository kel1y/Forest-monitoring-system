'use client'

import { useState } from 'react'
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

export default function YearRangeSelector({ onSubmit }) {
  const [yearRange, setYearRange] = useState([2013, 2023])

  const handleYearRangeChange = (values) => {
    setYearRange(values)
  }

  const handleSubmit = () => {
    onSubmit(yearRange)
  }

  return (
    <div className="mb-4">
      <label htmlFor="year-range" className="block text-sm font-medium text-gray-700 mb-2">
        Select Year Range: {yearRange[0]} - {yearRange[1]}
      </label>
      <Slider
        id="year-range"
        min={2013}
        max={2023}
        step={1}
        value={yearRange}
        onValueChange={handleYearRangeChange}
        className="mb-4"
      />
      <Button onClick={handleSubmit}>Generate Chart</Button>
    </div>
  )
}

