export interface Team {
  id: number
  name: string
  shortName: string
  tla: string
  crest: string
  address: string
  website: string
  founded: number
  clubColors: string
  venue: string
  lastUpdated: string
  matches?: Match[]
  standings?: Standing
}

// Simplified ExtendedTeam interface with only the properties we need
export interface ExtendedTeam extends Team {
  salary: number
  salaryRank?: number
  venueCapacity: number
  venueCapacityRank?: number
  [key: string]: any // Allow string indexing
}

export interface Match {
  id: number
  matchday: number
  homeTeam: Team
  awayTeam: Team
  score: {
    winner: string | null
    fullTime: {
      home: number | null
      away: number | null
    }
  }
  status: string
  utcDate: string
}

export interface Standing {
  position: number
  played: number
  won: number
  draw: number
  lost: number
  points: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
}

export interface ExtendedStanding extends Standing {
  team: ExtendedTeam
  form?: string
}

export interface ClubNavProps {
  team: Team
}
