'use client'

import { useState } from 'react'
import Image from 'next/image'
import MicroModal from 'micromodal'
import ClubCardStat from './ClubCardStat'
import ClubMatches from './ClubMatches'
import type { ExtendedStanding } from '@/types'
import './club-card.css'

export default function ClubCard({ standing }: { standing: ExtendedStanding }) {
  const isInverse = ['lut', 'not', 'tot'].includes(standing.team.tla.toLowerCase())

  const openModal = (teamTla: string) => {
    MicroModal.show(`modal-${teamTla}`, {
      disableScroll: true
    })
  }

  return (
    <div 
      id={`club-${standing.team.tla.toLowerCase()}`} 
      className={['club-card', `club-${standing.team.tla.toLowerCase()}`, isInverse ? 'inverse' : ''].filter(Boolean).join(' ')}
    >
      <div className="club-card-tla">{standing.team.tla}</div>
      <div className="club-card-info">
        <div className="club-card-logo">
          <Image
            src={`/club-logos/${standing.team.tla.toLowerCase()}.png`} 
            alt={`${standing.team.shortName} Crest`} 
            width={110}
            height={110}
            style={{ objectFit: 'contain', width: 'auto', height: '110px' }}
          />
        </div>
        <div className="club-card-info-rank">
          <span className="club-card-rank-position">{`#${standing.position}`}</span>
          <span className="club-card-rank-points">
            {`${standing.points} PTS`} {standing.goalDifference >= 0 ? `+${standing.goalDifference}` : standing.goalDifference}
          </span>
        </div>
        <h2 className="club-card-info-name">{standing.team.shortName}</h2>
        {standing.form && (
          <div className="standing-form-container">
            <ul className="standing-form">
              {standing.form.split(',').map((form, index) => (
                <li key={index} className={`form-outcome ${form.toLowerCase()}`}>{form}</li>
              ))}
            </ul>
            <div className="standing-form-footer">
              <p className="standing-form-label">Last 5 Games</p>
              <button 
                id={`modal-launch-${standing.team.tla}`} 
                type="button" 
                className="modal-results-launch" 
                aria-label={`Open results for ${standing.team.shortName}`}
                aria-controls="navigation" 
                aria-expanded="false" 
                onClick={() => openModal(standing.team.tla)}
              >
                <span className="button-text">{standing.team.tla} Results</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="club-card-stats">
        <ClubCardStat
          label="Club Founded"
          rank={standing.team.teamAgeRank ?? undefined}
          value={standing.team.teamAge ?? 0}
          suffix="yrs ago"
        />
        <ClubCardStat
          label="Manager Age"
          rank={standing.team.managerAgeRank ?? undefined}
          value={standing.team.managerAge ?? 0}
          suffix="yrs old"
        />
        <ClubCardStat
          label="Team Experience"
          rank={standing.team.averageAgeRank ?? undefined}
          value={Number(standing.team.averageAge ?? 0).toFixed(1)}
          suffix="avg yrs old"
        />
        <ClubCardStat
          label="Countries Represented"
          rank={standing.team.uniqueNationalitiesRank ?? undefined}
          value={standing.team.uniqueNationalitiesCount ?? 0}
        />
        <ClubCardStat
          label="Players from Europe"
          rank={standing.team.europeanPlayerPercentageRank ?? undefined}
          value={standing.team.europeanPlayerPercentage ?? 0}
          suffix="%"
        />
        <ClubCardStat
          label="Players from England"
          rank={standing.team.englandPlayerPercentageRank ?? undefined}
          value={standing.team.englandPlayerPercentage ?? 0}
          suffix="%"
        />
        <ClubCardStat
          label="Players from USA"
          rank={standing.team.usaPlayerCountRank ?? undefined}
          value={standing.team.usaPlayerCount ?? 0}
          suffix={(standing.team.usaPlayerCount ?? 0) === 1 ? 'Player' : 'Players'}
        />
        <ClubCardStat
          label="Stadium Capacity"
          rank={standing.team.venueCapacityRank ?? undefined}
          value={(standing.team.venueCapacity ?? 0).toLocaleString()}
          suffix={standing.team.venue ?? 'Unknown'}
        />
        <ClubCardStat
          label="Total Salaries"
          rank={standing.team.salaryRank ?? undefined}
          value={`£${(standing.team.salary ?? 0).toLocaleString()}`}
        />
        <ClubCardStat
          label="Oldest Player"
          rank={standing.team.oldestPlayerRank ?? undefined}
          value={standing.team.oldestPlayer?.name ?? 'Unknown'}
          suffix={`${standing.team.oldestPlayer?.age ?? 0} yrs`}
        />
        <ClubCardStat
          label="Youngest Player"
          rank={standing.team.youngestPlayerRank ?? undefined}
          value={standing.team.youngestPlayer?.name ?? 'Unknown'}
          suffix={`${standing.team.youngestPlayer?.age ?? 0} yrs`}
        />
        <ClubCardStat
          label="Most Common Zodiac Sign"
          value={standing.team.zodiacSign?.sign ?? 'Unknown'}
          suffix={`${standing.team.zodiacSign?.count ?? 0} Players`}
        />
      </div>
      <ClubMatches standing={standing} />
    </div>
  )
}
