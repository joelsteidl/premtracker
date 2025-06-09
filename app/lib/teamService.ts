import { fetchFromAPI } from './api'
import { STATIC_TEAM_DATA } from './teamData'
import type { ExtendedStanding } from '@/types'

type TeamCode = keyof typeof STATIC_TEAM_DATA

function calculateRanks(teams: ExtendedStanding[], property: string) {
  const sortedTeams = [...teams].sort((a, b) => 
    (b.team[property] || 0) - (a.team[property] || 0)
  )
  sortedTeams.forEach((team, index) => {
    team.team[`${property}Rank`] = index + 1
  })
}

function calculateTeamStats(squad: any[], teamData: any) {
  if (!squad || !Array.isArray(squad)) return null

  const today = new Date()
  const players = squad
    .filter(player => player.dateOfBirth) // Only include players with birth dates
    .map(player => ({
      ...player,
      age: Math.floor((today.getTime() - new Date(player.dateOfBirth).getTime()) / 31557600000),
      zodiacSign: getZodiacSign(new Date(player.dateOfBirth))
    }))

  // Find oldest and youngest players
  const oldestPlayer = players.reduce((prev, curr) => prev.age > curr.age ? prev : curr)
  const youngestPlayer = players.reduce((prev, curr) => prev.age < curr.age ? prev : curr)

  // Calculate zodiac sign statistics
  const zodiacCounts: { [key: string]: number } = players.reduce((acc, player) => {
    acc[player.zodiacSign] = (acc[player.zodiacSign] || 0) + 1
    return acc
  }, {} as { [key: string]: number })

  const mostCommonZodiac = Object.entries(zodiacCounts)
    .reduce((prev, [sign, count]) => 
      count > prev.count ? { sign, count } : prev
    , { sign: '', count: 0 })

  // Calculate nationality stats
  const nationalities = new Set(players.map(p => p.nationality))
  const europeanPlayers = players.filter(p => {
    const europeanCountries = new Set([
      'England', 'France', 'Spain', 'Germany', 'Italy', 'Portugal', 'Netherlands',
      'Belgium', 'Denmark', 'Norway', 'Sweden', 'Switzerland', 'Austria', 'Croatia',
      'Serbia', 'Ukraine', 'Poland', 'Czech Republic', 'Romania', 'Hungary'
    ])
    return europeanCountries.has(p.nationality)
  })
  const englishPlayers = players.filter(p => p.nationality === 'England')
  const usPlayers = players.filter(p => p.nationality === 'United States')

  // Get manager age from team coach data
  const coach = teamData.coach
  const managerAge = coach?.dateOfBirth ? 
    Math.floor((today.getTime() - new Date(coach.dateOfBirth).getTime()) / 31557600000) : 0

  // Calculate team age (years since founding)
  const teamAge = teamData.founded ? 
    new Date().getFullYear() - teamData.founded : 
    0

  return {
    managerAge,
    teamAge,
    averageAge: Number((players.reduce((sum, p) => sum + p.age, 0) / players.length).toFixed(1)),
    uniqueNationalitiesCount: nationalities.size,
    europeanPlayerPercentage: Math.round((europeanPlayers.length / players.length) * 100),
    englandPlayerPercentage: Math.round((englishPlayers.length / players.length) * 100),
    usaPlayerCount: usPlayers.length,
    oldestPlayer: { 
      name: oldestPlayer.name || `${oldestPlayer.firstName || ''} ${oldestPlayer.lastName || ''}`.trim(), 
      age: oldestPlayer.age 
    },
    youngestPlayer: { 
      name: youngestPlayer.name || `${youngestPlayer.firstName || ''} ${youngestPlayer.lastName || ''}`.trim(), 
      age: youngestPlayer.age 
    },
    zodiacSign: mostCommonZodiac
  }
}

function getZodiacSign(date: Date): string {
  const month = date.getMonth() + 1
  const day = date.getDate()

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries'
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus'
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini'
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer'
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo'
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo'
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra'
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio'
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius'
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn'
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius'
  return 'Pisces'
}

function validateTeamData(team: ExtendedStanding): boolean {
  const requiredProperties = [
    'salary',
    'venueCapacity',
    'venue',
    'managerAge',
    'oldestPlayer',
    'youngestPlayer',
    'zodiacSign'
  ]

  const missingProps = requiredProperties.filter(prop => 
    team.team[prop] === undefined || team.team[prop] === null
  )

  if (missingProps.length > 0) {
    console.warn(`Team ${team.team.tla} is missing properties:`, missingProps)
    return false
  }

  return true
}

export async function getTeamData() {
  const competitionId = 2021 // Premier League ID
  const season = 2023 // 2023/24 season

  // Fetch standings, matches, and teams data in parallel
  const [standings, matches, teamsData] = await Promise.all([
    fetchFromAPI(`/competitions/${competitionId}/standings?season=${season}`),
    fetchFromAPI(`/competitions/${competitionId}/matches?season=${season}`),
    fetchFromAPI(`/competitions/${competitionId}/teams?season=${season}`)
  ])

  const teamsWithData = standings.standings[0].table.map((teamStanding: any) => {
    const teamTla = teamStanding.team.tla as TeamCode
    const staticData = STATIC_TEAM_DATA[teamTla]
    
    if (!staticData) {
      console.warn(`No static data found for team ${teamTla}`)
      return null
    }

    const teamData = teamsData.teams.find((t: { id: number }) => t.id === teamStanding.team.id)
    if (!teamData) {
      console.warn(`No team data found for team ${teamTla}`)
      return null
    }

    const stats = calculateTeamStats(teamData.squad, teamData)
    if (!stats) {
      console.warn(`Could not calculate stats for team ${teamTla}`)
      return null
    }

    return {
      ...teamStanding,
      team: {
        ...teamStanding.team,
        // Add matches data
        matches: matches.matches.filter((match: any) => 
          match.homeTeam.id === teamStanding.team.id || 
          match.awayTeam.id === teamStanding.team.id
        ),
        // Add static data
        salary: staticData.salary,
        venueCapacity: staticData.venueCapacity,
        // Add venue name from team data
        venue: teamData.venue,
        // Add calculated data
        ...stats
      }
    }
  }).filter(Boolean) as ExtendedStanding[]

  // Validate team data before calculating ranks
  const validTeamsWithData = teamsWithData.filter(validateTeamData)

  if (validTeamsWithData.length !== teamsWithData.length) {
    console.warn(`${teamsWithData.length - validTeamsWithData.length} teams were filtered out due to missing data`)
  }

  // Calculate ranks for numeric properties
  const properties = [
    'salary',
    'venueCapacity',
    'managerAge',
    'averageAge',
    'uniqueNationalitiesCount',
    'europeanPlayerPercentage',
    'englandPlayerPercentage',
    'usaPlayerCount'
  ]

  // Calculate ranks for all properties
  properties.forEach(prop => calculateRanks(validTeamsWithData, prop))

  // Special handling for oldest and youngest players
  const sortedByOldest = [...validTeamsWithData].sort((a, b) => 
    b.team.oldestPlayer.age - a.team.oldestPlayer.age
  )
  sortedByOldest.forEach((team, index) => {
    team.team.oldestPlayerRank = index + 1
  })

  const sortedByYoungest = [...validTeamsWithData].sort((a, b) => 
    a.team.youngestPlayer.age - b.team.youngestPlayer.age
  )
  sortedByYoungest.forEach((team, index) => {
    team.team.youngestPlayerRank = index + 1
  })

  return validTeamsWithData
}
