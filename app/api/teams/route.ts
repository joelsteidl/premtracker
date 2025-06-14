import { NextRequest, NextResponse } from 'next/server'
import { getTeamData } from '@/app/lib/teamService'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const season = searchParams.get('season') || '2023-24'
    
    console.log('API: Loading team data for season:', season, '- Enhanced debugging enabled at', new Date().toISOString())
    const data = await getTeamData(season)
    console.log('API: Loaded', data.length, 'teams successfully')
    
    // Debug: Log manager age information
    const managerAgeStats = data.map(team => ({
      team: team.team.tla,
      managerAge: team.team.managerAge,
      status: team.team.managerAgeStatus || 'unknown'
    }))
    
    console.log('Manager age summary:', managerAgeStats)
    
    const zeroAgeManagers = managerAgeStats.filter(t => t.managerAge === 0)
    if (zeroAgeManagers.length > 0) {
      console.log(`Found ${zeroAgeManagers.length} teams with manager age = 0:`, zeroAgeManagers)
    }
    
    console.log('API: Request completed at', new Date().toISOString())
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch team data' },
      { status: 500 }
    )
  }
}
