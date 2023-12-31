const ClubMatch = ({ match, teamId }) => {
  let result;
  if (match.score.winner !== null) {
    if (match.score.fullTime.home === match.score.fullTime.away) {
      result = 'd';
    } else if (
      (match.homeTeam.id === teamId && match.score.fullTime.home > match.score.fullTime.away) ||
      (match.awayTeam.id === teamId && match.score.fullTime.away > match.score.fullTime.home)
    ) {
      result = 'w';
    } else {
      result = 'l';
    }
  }

  const matchStatus = ['SUSPENDED', 'POSTPONED', 'CANCELLED'].includes(match.status) ?
  `${match.status.charAt(0).toUpperCase()}${match.status.slice(1).toLowerCase()}` :
  ['TIMED', 'SCHEDULED'].includes(match.status) ?
    new Date(match.utcDate).toLocaleTimeString(typeof window !== 'undefined' && window.navigator.language, { hour: '2-digit', minute: '2-digit' }) :
    `${match.score.fullTime.home} - ${match.score.fullTime.away}`;

  return (
    <div className="match">
      <h3>Matchweek {match.matchday} - {new Date(match.utcDate).toLocaleDateString('en-GB', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'Europe/London' })}</h3>
      <div className="match-outcome">
        <div className="match-outcome-home">
          {match.homeTeam.shortName} <img src={`/club-logos/${match.homeTeam.tla.toLowerCase()}.png`} height="30" />
        </div>
        <div className={`match-outcome-status${result ? ` ${result}` : ' default'}`}>{matchStatus}</div>
        <div className="match-outcome-away"><img src={`/club-logos/${match.awayTeam.tla.toLowerCase()}.png`} height="30" /> {match.awayTeam.shortName}</div>
      </div>
    </div>
  );
}

export default ClubMatch;
