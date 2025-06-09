import Navigation from './components/Navigation'
import ClubCard from './components/ClubCard'
import type { ExtendedStanding } from '@/types'
import './styles/pages/home.css'

import { getTeamData } from './lib/teamService'

// Use unstable_noStore to opt out of static rendering
import { unstable_noStore as noStore } from 'next/cache';

async function getStandings() {
  // Opt out of static rendering and cache
  noStore();
  return await getTeamData();
}

export default async function HomePage() {
  const standings = await getStandings();

  return (
    <>
      <Navigation sortedTeams={standings.map(s => s.team)} />
      <div className="standings-grid">
        {standings.map((standing) => (
          <ClubCard
            key={`club-${standing.team.id}`}
            standing={standing}
          />
        ))}
      </div>
    </>
  )
}
