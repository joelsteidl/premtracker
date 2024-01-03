import ClubMatch from "./ClubMatch";

const ClubMatches = ({ standing }) => {
  const isInverse = ['lut', 'not', 'tot'].includes(standing.team.tla.toLowerCase());
  return (
    <div id={`modal-${standing.team.tla}`} className="modal match-modal" aria-hidden="true">
      <div tabIndex="-1" data-micromodal-close>
        <div className="match-modal-inner" role="dialog" aria-modal="true">
          <div className={['club-card-info', `club-${standing.team.tla.toLowerCase()}`, isInverse ? 'inverse' : ''].filter(Boolean).join(' ')}>
            <button id={`button-close-${standing.team.tla}`} className="hamburger hamburger--spin is-active hamburger-button" type="button" aria-label="Close Results" aria-controls="navigation" aria-expanded="true" data-micromodal-close>
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>
            <div className="club-card-logo">
              <img src={`/club-logos/${standing.team.tla.toLowerCase()}.png`} alt="{standing.team.shortName} Crest" width="100" />
            </div>
            <div className="club-card-info-rank">
              <span className="club-card-rank-position">{`#${standing.position}`}</span>
              <span className="club-card-rank-points">{`${standing.points} PTS`} {standing.goalDifference >= 0 ? `+${standing.goalDifference}` : standing.goalDifference}</span>
            </div>
            <h2 className="club-card-info-name">{standing.team.shortName}</h2>
            {standing.form && (
              <div className="standing-form-container">
                <ul className="standing-form">
                  <li className="form-outcome w">{standing.won}</li>
                  <li className="form-outcome d">{standing.draw}</li>
                  <li className="form-outcome l">{standing.lost}</li>
                </ul>
              </div>
            )}
          </div>
          {standing.team.matches.map((match) => (
            <ClubMatch key={`match-${match.id}`} match={match} teamId={standing.team.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ClubMatches;
