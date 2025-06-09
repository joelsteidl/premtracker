export interface Squad {
  founded: number
  players: Player[]
}

export interface Player {
  id: number
  firstName: string
  lastName: string
  name: string
  position: string
  dateOfBirth: string
  nationality: string
  shirtNumber: number | null
}

export interface Squad {
  id: number
  name: string
  founded: number
  squad: Player[]
}
