'use client'

import './club-card-stat.css'

interface ClubCardStatProps {
  label: string
  rank?: number
  value: string | number
  suffix?: string
}

export default function ClubCardStat({ label, rank, value, suffix }: ClubCardStatProps) {
  return (
    <div className="club-card-stat">
      <div className="club-card-stat-header">
        <div className="club-card-stat-label">{label}</div>
        {rank && (
          <div className="club-card-stat-rank">
            <span className="club-card-stat-rank-hashtag">#</span>
            <span className="club-card-stat-rank-value">{rank}</span>
          </div>
        )}
      </div>
      <div className="club-card-stat-value">
        <span className="club-card-stat-value-main">{value}</span>
        {suffix && <span className="club-card-stat-value-suffix">{suffix}</span>}
      </div>
    </div>
  )
}
