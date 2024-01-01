import ClubCardStat from "./ClubCardStat";
import ClubMatches from "./ClubMatches";
import MicroModal from 'micromodal';

const ClubCard = ({ standing }) => {

  const isInverse = ['lut', 'not', 'tot'].includes(standing.team.tla.toLowerCase());
  const openModal = (teamTla) => {
    MicroModal.show(`modal-${teamTla}`, {
      disableScroll: true
    });
  };
  return (
    <div id={`club-${standing.team.tla.toLowerCase()}`} className={['club-card', `club-${standing.team.tla.toLowerCase()}`, isInverse ? 'inverse' : ''].filter(Boolean).join(' ')}>
      <div className="club-card-tla">{standing.team.tla}</div>
      <div className="club-card-info">
        <div className="club-card-logo">
          <img src={`/club-logos/${standing.team.tla.toLowerCase()}.png`} alt="{standing.team.shortName} Crest" width="110" />
        </div>
        <div className="club-card-info-rank">
          <span className="club-card-rank-position">{`#${standing.position}`}</span>
          <span className="club-card-rank-points">{`${standing.points} PTS`} {standing.goalDifference >= 0 ? `+${standing.goalDifference}` : standing.goalDifference}</span>
        </div>
        <h2 className="club-card-info-name">{standing.team.shortName}</h2>
        {standing.form && (
          <div className="standing-form-container">
            <ul className="standing-form">
              {standing.form.split(',').map((form, index) => (
                <li key={index} className={`form-outcome ${form.toLowerCase()}`}>{form}</li>
              ))}
            </ul>
            <p className="standing-form-label">Last 5 Games</p>
          </div>
        )}
          <button id={`modal-launch-${standing.team.tla}`} type="button" className="modal-results-launch learn-more" aria-label="Open results for {standing.team.shortName}" aria-controls="navigation" aria-expanded="false" onClick={() => openModal(standing.team.tla)}>
            <span class="circle" aria-hidden="true">
              <span class="icon arrow"></span>
            </span>
            <span class="button-text">View {standing.team.tla} Results</span>
          </button>
      </div>

      <div className="club-card-stats">
        <ClubCardStat
          key={`founded-$standing.team.id`}
          label="Club Founded"
          rank={standing.team.teamAgeRank}
          value={standing.team.teamAge}
          suffix="yrs ago"
        />
        <ClubCardStat
          key={`manager-$standing.team.id`}
          label="Manager Age"
          rank={standing.team.managerAgeRank}
          value={standing.team.managerAge}
          suffix="yrs old"
        />
        <ClubCardStat
          key={`teamage-$standing.team.id`}
          label="Team Experience"
          rank={standing.team.averageAgeRank}
          value={standing.team.averageAge}
          suffix="avg yrs old"
        />
        <ClubCardStat
          key={`countries-$standing.team.id`}
          label="Countries Represented"
          rank={standing.team.uniqueNationalitiesRank}
          value={standing.team.uniqueNationalitiesCount}
        />
        <ClubCardStat
          key={`europe-$standing.team.id`}
          label="Players from Europe"
          rank={standing.team.europeanPlayerPercentageRank}
          value={standing.team.europeanPlayerPercentage}
          suffix="%"
        />
        <ClubCardStat
          key={`england-$standing.team.id`}
          label="Players from England"
          rank={standing.team.englandPlayerPercentageRank}
          value={standing.team.englandPlayerPercentage}
          suffix="%"
        />
        <ClubCardStat
          key={`usa-$standing.team.id`}
          label="Players from USA"
          rank={standing.team.usaPlayerCountRank}
          value={standing.team.usaPlayerCount}
          suffix={standing.team.usaPlayerCount === 1 ? 'Player' : 'Players'}
        />
        <ClubCardStat
          key={`venue-$standing.team.id`}
          label="Stadium Capacity"
          rank={standing.team.venueCapacityRank}
          value={standing.team.venueCapacity.toLocaleString()}
          suffix={standing.team.venue}
        />
        <ClubCardStat
          key={`salary-$standing.team.id`}
          label="Total Salaries"
          rank={standing.team.salaryRank}
          value={`£${standing.team.salary.toLocaleString()}`}
        />
        <ClubCardStat
          key={`oldest-$standing.team.id`}
          label="Oldest Player"
          rank={standing.team.oldestPlayerRank}
          value={`${standing.team.oldestPlayer.age}`}
          suffix={standing.team.oldestPlayer.name}
        />
        <ClubCardStat
          key={`youngest-$standing.team.id`}
          label="Youngest Player"
          rank={standing.team.youngestPlayerRank}
          value={standing.team.youngestPlayer.age}
          suffix={standing.team.youngestPlayer.name}
        />
        <ClubCardStat
          key={`zodiac-$standing.team.id`}
          label="Most Common Zodiac Sign"
          value={standing.team.zodiacSign.sign}
          suffix={`${standing.team.zodiacSign.count} Players`}
        />
      </div>
      <ClubMatches
          key={`matches-$standing.team.id`}
          standing={standing}
        />
    </div>
  );
}

export default ClubCard;
