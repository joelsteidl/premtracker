'use client'

import { Match } from '@/types'
import { formatMatchDate, formatMatchTime } from '@/app/lib/dateUtils'
import TeamLogo from './TeamLogo'
import './club-match.css'

interface ClubMatchProps {
  match: Match & {
    matchday: number
    score: {
      winner: string | null
      fullTime: {
        home: number | null
        away: number | null
      }
    }
  }
  teamId: number
}

export default function ClubMatch({ match, teamId }: ClubMatchProps) {
  let result: 'w' | 'l' | 'd' | undefined

  if (match.score.winner !== null) {
    if (match.score.fullTime.home === match.score.fullTime.away) {
      result = 'd'
    } else if (
      (match.homeTeam.id === teamId && match.score.fullTime.home! > match.score.fullTime.away!) ||
      (match.awayTeam.id === teamId && match.score.fullTime.away! > match.score.fullTime.home!)
    ) {
      result = 'w'
    } else {
      result = 'l'
    }
  }

  const matchStatus = ['SUSPENDED', 'POSTPONED', 'CANCELLED'].includes(match.status)
    ? `${match.status.charAt(0).toUpperCase()}${match.status.slice(1).toLowerCase()}`
    : ['TIMED', 'SCHEDULED'].includes(match.status)
      ? formatMatchTime(match.utcDate)
      : `${match.score.fullTime.home} - ${match.score.fullTime.away}`

  return (
    <div className="match">
      <h3>
        Matchweek {match.matchday} -{' '}
        {formatMatchDate(match.utcDate)}
      </h3>
      <div className="match-outcome">
        <div className="match-outcome-home">
          {match.homeTeam.shortName}{' '}
          <TeamLogo
            teamTla={match.homeTeam.tla}
            teamName={match.homeTeam.shortName}
            apiLogoUrl={match.homeTeam.crest}
            height={30}
            width={30}
            style={{ objectFit: 'contain', width: 'auto', height: '30px' }}
          />
        </div>
        <div className={`match-outcome-status${result ? ` ${result}` : ' default'}`}>
          {matchStatus}
        </div>
        <div className="match-outcome-away">
          <TeamLogo
            teamTla={match.awayTeam.tla}
            teamName={match.awayTeam.shortName}
            apiLogoUrl={match.awayTeam.crest}
            height={30}
            width={30}
            style={{ objectFit: 'contain', width: 'auto', height: '30px' }}
          />{' '}
          {match.awayTeam.shortName}
        </div>
      </div>
    </div>
  )
}
