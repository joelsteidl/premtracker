'use client'

import { useState, useEffect } from 'react'
import './season-picker.css'

interface Season {
  id: string
  label: string
  years: string
}

interface SeasonPickerProps {
  currentSeason: string
  onSeasonChange: (season: string) => void
}

const AVAILABLE_SEASONS: Season[] = [
  { id: '2025-26', label: '2025/26', years: '2025/26' },
  { id: '2024-25', label: '2024/25', years: '2024/25' },
  { id: '2023-24', label: '2023/24', years: '2023/24' },
]

export default function SeasonPicker({ currentSeason, onSeasonChange }: SeasonPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const currentSeasonData = AVAILABLE_SEASONS.find(s => s.id === currentSeason)

  const handleSeasonSelect = (seasonId: string) => {
    onSeasonChange(seasonId)
    setIsOpen(false)
  }

  return (
    <div className="season-picker">
      <button
        className="season-picker-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Select season"
      >
        <span className="season-picker-current">
          {currentSeasonData?.label || '2025/26'}
        </span>
        <svg
          className={`season-picker-arrow ${isOpen ? 'open' : ''}`}
          viewBox="0 0 24 24"
          width="16"
          height="16"
        >
          <path d="M7 10l5 5 5-5z" fill="currentColor"/>
        </svg>
      </button>

      {isOpen && (
        <div className="season-picker-dropdown">
          {AVAILABLE_SEASONS.map((season) => (
            <button
              key={season.id}
              className={`season-picker-option ${currentSeason === season.id ? 'active' : ''}`}
              onClick={() => handleSeasonSelect(season.id)}
            >
              {season.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
