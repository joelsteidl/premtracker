'use client'

import Image from 'next/image'
import SeasonPicker from './SeasonPicker'
import { useSeason } from '../lib/SeasonContext'

export default function Header() {
  const { currentSeason, setSeason } = useSeason()

  const handleSeasonChange = (newSeason: string) => {
    setSeason(newSeason)
    
    // Trigger data reload for the new season
    console.log('Loading data for season:', newSeason)
    
    // Dispatch custom event that the page can listen to
    window.dispatchEvent(new CustomEvent('seasonChanged', { 
      detail: { season: newSeason } 
    }))
  }

  return (
    <header>
      <Image
        className="logo"
        src="/pl_logo_white.png"
        alt="PL Standings"
        width={120}
        height={80}
        priority
      />
      <div className="logo-text">
        <h1>PremTracker</h1>
        <SeasonPicker 
          currentSeason={currentSeason} 
          onSeasonChange={handleSeasonChange}
        />
      </div>
    </header>
  )
}
