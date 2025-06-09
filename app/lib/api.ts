const BASE_URL = 'https://api.football-data.org/v4'

export async function fetchFromAPI(endpoint: string) {
  const apiKey = process.env.FOOTBALL_DATA_API_KEY
  if (!apiKey) {
    throw new Error('Missing Football Data API Key')
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'X-Auth-Token': apiKey
    },
    next: {
      revalidate: 300 // Cache for 5 minutes
    }
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`)
  }

  return response.json()
}
