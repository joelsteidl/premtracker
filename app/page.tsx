'use client'

import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import ClubCard from './components/ClubCard'
import { useSeason } from './lib/SeasonContext'
import type { ExtendedStanding } from '@/types'
import './styles/pages/home.css'

export default function HomePage() {
  const { currentSeason } = useSeason()
  const [standings, setStandings] = useState<ExtendedStanding[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadData = async (season: string) => {
    try {
      setLoading(true)
      setError(null)
      console.log('Loading data for season:', season)
      
      const response = await fetch(`/api/teams?season=${season}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`)
      }
      
      const data = await response.json()
      setStandings(data)
    } catch (err) {
      console.error('Failed to load team data:', err)
      setError('Failed to load team data. Please try again.')
      setStandings([])
    } finally {
      setLoading(false)
    }
  }

  // Load initial data
  useEffect(() => {
    loadData(currentSeason)
  }, [currentSeason])

  // Listen for season changes
  useEffect(() => {
    const handleSeasonChange = (event: CustomEvent) => {
      const newSeason = event.detail.season
      console.log('Season changed via custom event:', newSeason)
      loadData(newSeason)
    }

    window.addEventListener('seasonChanged', handleSeasonChange as EventListener)
    
    return () => {
      window.removeEventListener('seasonChanged', handleSeasonChange as EventListener)
    }
  }, [])

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '400px',
        color: '#FFFFFF',
        fontSize: '1.2rem'
      }}>
        Loading {currentSeason} season data...
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '400px',
        color: '#FF6B6B',
        fontSize: '1.2rem',
        textAlign: 'center'
      }}>
        {error}
      </div>
    )
  }

  if (standings.length === 0) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '400px',
        color: '#FFFFFF',
        fontSize: '1.2rem'
      }}>
        No data available for {currentSeason} season.
      </div>
    )
  }

  return (
    <>
      <Navigation sortedTeams={standings.map(s => s.team)} />
      <div className="standings-grid">
        {standings.map((standing) => (
          <ClubCard
            key={`club-${standing.team.id}`}
            standing={standing}
          />
        ))}
      </div>
    </>
  )
}
