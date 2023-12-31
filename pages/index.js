import ClubCard from '../components/ClubCard'
import Layout from '../components/Layout'

export async function getStaticProps() {

  async function fetchData(url, options) {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  }

  const dataStandings = await fetchData('https://api.football-data.org/v4/competitions/PL/standings?season=2023', {
    headers: {
      'X-Auth-Token': process.env.FOOTBALL_DATA_API_KEY
    }
  });

  const dataTeams = await fetchData('https://api.football-data.org/v4/competitions/PL/teams?season=2023', {
    headers: {
      'X-Auth-Token': process.env.FOOTBALL_DATA_API_KEY
    }
  });

  const dataMatches = await fetchData('https://api.football-data.org/v4/competitions/PL/matches?season=2023', {
    headers: {
      'X-Auth-Token': process.env.FOOTBALL_DATA_API_KEY
    }
  });

  function getTeamRank(teams, teamId, property, isAscending) {
    let prevValue = null;
    let rank = 1;

    const sortedTeams = [...teams].sort((a, b) => {
      const aValue = property.split('.').reduce((o, i) => o[i], a);
      const bValue = property.split('.').reduce((o, i) => o[i], b);
      return isAscending ? aValue - bValue : bValue - aValue;
    });

    for (let i = 0; i < sortedTeams.length; i++) {
      const currentValue = property.split('.').reduce((o, i) => o[i], sortedTeams[i]);
      if (i > 0 && currentValue !== prevValue) {
        rank++;
      }
      if (sortedTeams[i].id === teamId) {
        return rank;
      }
      prevValue = currentValue;
    }

    return -1; // return -1 if teamId is not found
  }

  function calculateAge(dateOfBirth) {
    let dob;
    if (dateOfBirth && dateOfBirth.length === 4) {
      dob = new Date(`${dateOfBirth}-01-01`);
    } else {
      dob = new Date(dateOfBirth);
    }
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    return (m < 0 || (m === 0 && today.getDate() < dob.getDate())) ? age - 1 : age;
  }

  const getOldestAndYoungest = (squad) => {
    return squad.reduce((acc, player) => {
      if (!acc.oldest || new Date(player.dateOfBirth) < new Date(acc.oldest.dateOfBirth)) {
        acc.oldest = player;
      }
      if (!acc.youngest || new Date(player.dateOfBirth) > new Date(acc.youngest.dateOfBirth)) {
        acc.youngest = player;
      }
      return acc;
    }, { oldest: null, youngest: null });
  };

  function getMostRepresentedNationality(squad) {
    const nationalityCount = squad.reduce((acc, player) => {
      acc[player.nationality] = (acc[player.nationality] || 0) + 1;
      return acc;
    }, {});

    let maxCount = 0;
    let maxNationality = '';
    for (const nationality in nationalityCount) {
      if (nationalityCount[nationality] > maxCount) {
        maxCount = nationalityCount[nationality];
        maxNationality = nationality;
      }
    }

    return { nationality: maxNationality, count: maxCount };
  }

  function calculateEuropeanPlayerPercentage(squad) {
    const europeanCountries = ['Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus', 'Belgium', 'Bosnia and Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'England', 'Estonia', 'Finland', 'France', 'Georgia', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Kazakhstan', 'Kosovo', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Moldova', 'Monaco', 'Montenegro', 'Netherlands', 'North Macedonia', 'Norway', 'Poland', 'Portugal', 'Romania', 'Russia', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom', 'Vatican City'];
    const totalPlayerCount = squad.length;
    const europeanPlayers = squad.filter(player => europeanCountries.includes(player.nationality));
    const europeanPlayerCount = europeanPlayers.length;
    return Number(((europeanPlayerCount / totalPlayerCount) * 100).toFixed(2));
  }

  function calculateZodiacSignCount(squad) {
    const zodiacSigns = {
      'Aries': { start: '03-21', end: '04-19' },
      'Taurus': { start: '04-20', end: '05-20' },
      'Gemini': { start: '05-21', end: '06-20' },
      'Cancer': { start: '06-21', end: '07-22' },
      'Leo': { start: '07-23', end: '08-22' },
      'Virgo': { start: '08-23', end: '09-22' },
      'Libra': { start: '09-23', end: '10-22' },
      'Scorpio': { start: '10-23', end: '11-21' },
      'Sagittarius': { start: '11-22', end: '12-21' },
      'Capricorn': { start: '12-22', end: '01-19' },
      'Aquarius': { start: '01-20', end: '02-18' },
      'Pisces': { start: '02-19', end: '03-20' },
    };

    const counts = squad.reduce((acc, player) => {
      const playerBirthDate = new Date(player.dateOfBirth);
      const playerBirthMonthDay = new Date(`1970-${playerBirthDate.getMonth() + 1}-${playerBirthDate.getDate()}`);
      for (const sign in zodiacSigns) {
        const signRange = zodiacSigns[sign];
        const signStart = new Date(`1970-${signRange.start}`);
        const signEnd = new Date(`1970-${signRange.end}`);
        if (playerBirthMonthDay >= signStart && playerBirthMonthDay <= signEnd) {
          acc[sign] = (acc[sign] || 0) + 1;
        }
      }
      return acc;
    }, {});

    let mostCommonSign = null;
    let maxCount = 0;
    for (const sign in counts) {
      if (counts[sign] > maxCount) {
        mostCommonSign = sign;
        maxCount = counts[sign];
      }
    }

    return { sign: mostCommonSign, count: maxCount };
  }

  dataTeams.teams.map(team => {
    // Get the team's age.
    team.teamAge = calculateAge((team.founded || 1889).toString());

    // Get the manager's age.
    team.managerAge = calculateAge(team.coach.dateOfBirth);

    // Get the average age.
    const playerAges = team.squad.map(player => calculateAge(player.dateOfBirth));
    team.averageAge = Number((playerAges.reduce((a, b) => a + b, 0) / playerAges.length).toFixed(2));

    // Get the zodiac sign.
    team.zodiacSign = calculateZodiacSignCount(team.squad);

    // Get the percentage of European players.
    team.europeanPlayerPercentage = calculateEuropeanPlayerPercentage(team.squad);

    // Get the number of unique nationalities.
    const nationalities = team.squad.map(player => player.nationality);
    team.uniqueNationalitiesCount = new Set(nationalities).size;

    // Get the most represented nationality.
    team.mostRepresentedNationality = getMostRepresentedNationality(team.squad);

    // Get the number of players from the USA.
    team.usaPlayerCount = team.squad.filter(player => player.nationality === 'USA').length;

    // Get oldest and youngest player.
    const { oldest, youngest } = getOldestAndYoungest(team.squad);
    team.oldestPlayer = { name: oldest.name, age: calculateAge(oldest.dateOfBirth) };
    team.youngestPlayer = { name: youngest.name, age: calculateAge(youngest.dateOfBirth) };

    return team;
  });

  // Add static data. @TODO: scrape salary data.
  const staticTeamData = {
    'ARS': { salary: 166106000, venueCapacity: 60704 },
    'AVL': { salary: 114666000, venueCapacity: 42530 },
    'BHA': { salary: 61940000, venueCapacity: 31876 },
    'BOU': { salary: 44574000, venueCapacity: 11307 },
    'BRE': { salary: 38376000, venueCapacity: 17250 },
    'BUR': { salary: 35256000, venueCapacity: 21744 },
    'CHE': { salary: 150384000, venueCapacity: 40173 },
    'CRY': { salary: 69180000, venueCapacity: 25486 },
    'EVE': { salary: 78033000, venueCapacity: 39414 },
    'FUL': { salary: 49220000, venueCapacity: 24500 },
    'LIV': { salary: 134992000, venueCapacity: 61276 },
    'LUT': { salary: 22750000, venueCapacity: 11500 },
    'MCI': { salary: 201188000, venueCapacity: 53400 },
    'MUN': { salary: 203931000, venueCapacity: 74031 },
    'NEW': { salary: 9604000, venueCapacity: 52257 },
    'NOT': { salary: 66930000, venueCapacity: 30404 },
    'SHE': { salary: 26936000, venueCapacity: 32050 },
    'TOT': { salary: 115630000, venueCapacity: 62850 },
    'WHU': { salary: 97656000, venueCapacity: 62500 },
    'WOL': { salary: 44546000, venueCapacity: 31750 },
  };

  // Merge static data.
  dataTeams.teams = dataTeams.teams.map(team => {
    const staticData = staticTeamData[team.tla];
    return staticData ? { ...team, ...staticData } : team;
  });

  // Get match data.
  dataTeams.teams = dataTeams.teams.map(team => {
    const teamId = team.id;
    const teamMatches = dataMatches.matches.filter(match =>
      match.homeTeam.id === teamId || match.awayTeam.id === teamId
    );
    return { ...team, matches: teamMatches };
  });

  // Rank data.
  dataTeams.teams.map(team => {
    team.teamAgeRank = getTeamRank(dataTeams.teams, team.id, 'teamAge', false);
    team.averageAgeRank = getTeamRank(dataTeams.teams, team.id, 'averageAge', false);
    team.managerAgeRank = getTeamRank(dataTeams.teams, team.id, 'managerAge', false);
    team.uniqueNationalitiesRank = getTeamRank(dataTeams.teams, team.id, 'uniqueNationalitiesCount', false);
    team.europeanPlayerPercentageRank = getTeamRank(dataTeams.teams, team.id, 'europeanPlayerPercentage', false);
    team.salaryRank = getTeamRank(dataTeams.teams, team.id, 'salary', false);
    team.venueCapacityRank = getTeamRank(dataTeams.teams, team.id, 'venueCapacity', false);
    team.oldestPlayerRank = getTeamRank(dataTeams.teams, team.id, 'oldestPlayer.age', false);
    team.youngestPlayerRank = getTeamRank(dataTeams.teams, team.id, 'youngestPlayer.age', true);
    team.usaPlayerCountRank = getTeamRank(dataTeams.teams, team.id, 'usaPlayerCount', false);
    return team;
  });

  // Lastly, combine the standings and teams data.
  const combinedData = dataStandings.standings[0].table.map(standing => {
    const team = dataTeams.teams.find(team => team.id === standing.team.id);
    return team ? { ...standing, team } : standing;
  });

  const sortedTeams = [...dataTeams.teams].sort((a, b) => a.shortName.localeCompare(b.shortName));

  return {
    props: {
      standings: combinedData,
      sortedTeams: sortedTeams,
    },
    revalidate: 60,
  };
}

export default function Standings({ standings, sortedTeams }) {
  return (
    <Layout title="PL Stats" sortedTeams={sortedTeams}>
      {standings.map((standing) => (
        <ClubCard standing={standing} key={`standing-${standing.team.id}`} />
      ))}
    </Layout>
  );
}
