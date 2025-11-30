'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface SeasonContextType {
  currentSeason: string
  setSeason: (season: string) => void
}

const SeasonContext = createContext<SeasonContextType | undefined>(undefined)

export function SeasonProvider({ children }: { children: ReactNode }) {
  const [currentSeason, setCurrentSeason] = useState('2025-26')

  return (
    <SeasonContext.Provider value={{ currentSeason, setSeason: setCurrentSeason }}>
      {children}
    </SeasonContext.Provider>
  )
}

export function useSeason() {
  const context = useContext(SeasonContext)
  if (context === undefined) {
    throw new Error('useSeason must be used within a SeasonProvider')
  }
  return context
}
