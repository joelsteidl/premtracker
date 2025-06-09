import type { Squad, Player } from '@/types/squad'

export function calculateTeamAge(squad: Squad): number {
  return new Date().getFullYear() - squad.founded
}

export function calculateSquadStats(players: Player[]) {
  const today = new Date()
  const ages = players.map(player => {
    const birthDate = new Date(player.dateOfBirth)
    return today.getFullYear() - birthDate.getFullYear()
  })

  const nationalities = new Set(players.map(player => player.nationality))
  const europeanPlayers = players.filter(player => {
    const europeanCountries = new Set([
      'England', 'France', 'Spain', 'Germany', 'Italy', 'Portugal', 'Netherlands',
      'Belgium', 'Denmark', 'Norway', 'Sweden', 'Switzerland', 'Austria', 'Croatia',
      'Serbia', 'Ukraine', 'Poland', 'Czech Republic', 'Romania', 'Hungary',
      // Add more European countries as needed
    ])
    return europeanCountries.has(player.nationality)
  })
  const englishPlayers = players.filter(player => player.nationality === 'England')
  const usPlayers = players.filter(player => player.nationality === 'United States')

  const oldestPlayer = players.reduce((prev, curr) => 
    new Date(prev.dateOfBirth) < new Date(curr.dateOfBirth) ? prev : curr
  )

  const youngestPlayer = players.reduce((prev, curr) => 
    new Date(prev.dateOfBirth) > new Date(curr.dateOfBirth) ? prev : curr
  )

  const averageAge = ages.reduce((sum, age) => sum + age, 0) / ages.length

  return {
    averageAge: Number(averageAge.toFixed(1)),
    uniqueNationalitiesCount: nationalities.size,
    europeanPlayerPercentage: Math.round((europeanPlayers.length / players.length) * 100),
    englandPlayerPercentage: Math.round((englishPlayers.length / players.length) * 100),
    usaPlayerCount: usPlayers.length,
    oldestPlayer: {
      name: `${oldestPlayer.firstName} ${oldestPlayer.lastName}`,
      age: Math.floor((today.getTime() - new Date(oldestPlayer.dateOfBirth).getTime()) / 31557600000)
    },
    youngestPlayer: {
      name: `${youngestPlayer.firstName} ${youngestPlayer.lastName}`,
      age: Math.floor((today.getTime() - new Date(youngestPlayer.dateOfBirth).getTime()) / 31557600000)
    }
  }
}
